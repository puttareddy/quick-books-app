'use strict';

const request = require('request');
const QuickBooks = require('node-quickbooks');
const qs = require('querystring');
const app = require('../server');
const router = app.loopback.Router();
const qbConfig = require('../config').qb;

const port = process.env.PORT || 3006;

// Your QuickBooks application and consumer_key and consumer_secret
var consumerKey = qbConfig.consumerKey,
  consumerSecret = qbConfig.consumerSecret;

// Global Vars
var sessionSet = false,
  customers,
  items;

//This route will take the Request Token and Initiate the User Authentication
router.get('/authorize', function (req, res) {
  if (sessionSet) {
    //Call getQbo to create a QBO object in order to make QBO requests and migrate data
    let qbo = getQbo(req.session.qbo);   
    migrateData(qbo);

    //redirect to home page, if already data is migrated
    res.redirect('/');
    sessionSet = true;
  } else {

    let postBody = {
      url: QuickBooks.REQUEST_TOKEN_URL,
      oauth: {
        callback: 'https://quick-books-app.herokuapp.com/sync/callback/',
        consumer_key: consumerKey,
        consumer_secret: consumerSecret
      }
    }    
    request.post(postBody, function (e, r, data) {
      let requestToken = qs.parse(data);
      req.session.oauth_token_secret = requestToken.oauth_token_secret;
      res.redirect(QuickBooks.APP_CENTER_URL + requestToken.oauth_token);
    })
  }
})

//Access Token request followed by the Access Token response
router.get('/callback', function (req, res) {
  let postBody = {
    url: QuickBooks.ACCESS_TOKEN_URL,
    oauth: {
      consumer_key: consumerKey,
      consumer_secret: consumerSecret,
      token: req.query.oauth_token,
      token_secret: req.session.oauth_token_secret,
      verifier: req.query.oauth_verifier,
      realmId: req.query.realmId
    }
  }
  request.post(postBody, function (e, r, data) {
    let accessToken = qs.parse(data);
    
    //The Access Token is stored in req.session.qbo
    req.session.qbo = {
      token: accessToken.oauth_token,
      secret: accessToken.oauth_token_secret,
      companyid: postBody.oauth.realmId
    };

    req.session.save(function (err) {});

    //Call getQbo to create a QBO object and migrate data
    let qbo = getQbo(req.session.qbo);    
    migrateData(qbo);    
  })

  res.redirect('/');
  sessionSet = true;
})

//Function to create the QBO object
var getQbo = function (args) {
  return new QuickBooks(consumerKey,
    consumerSecret,
    args.token,
    args.secret,
    args.companyid,
    true, // use the Sandbox
    true); // turn debugging on

};

// Calls to get some customers and items when rendering initial page 
var migrateData = function (qbo) {
  //The first QBO request made in this app is a query to get a list of Customers in the user's company
  qbo.findCustomers({
      limit: 1000
    },
    function (e, searchResults) {
      customers = searchResults.QueryResponse.Customer;
      app.models.Customer.destroyAll({});
      customers.forEach(
        function storeItem(value) {
          app.models.Customer.create(value);
        })
    });
}

module.exports = router;
