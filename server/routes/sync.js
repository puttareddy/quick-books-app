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
    //Call getQbo to create a QBO object in order to make QBO requests
    console.log('--------', req.session)
    let qbo = getQbo(req.session.qbo);



    //Call function InitialCalls, which gathers data required for the customer.ejs view
    var response = initialCalls(qbo);

    console.log('session already set----------------')
    res.redirect('/explorer');
    sessionSet = true;
  } else {

    let postBody = {
      url: QuickBooks.REQUEST_TOKEN_URL,
      oauth: {
        callback: 'http://localhost:' + port + '/sync/callback/',
        consumer_key: consumerKey,
        consumer_secret: consumerSecret
      }
    }
    //process.env.CUSTOM_CALLBACK_URI,
    request.post(postBody, function (e, r, data) {
      let requestToken = qs.parse(data);
      req.session.oauth_token_secret = requestToken.oauth_token_secret;
      res.redirect(QuickBooks.APP_CENTER_URL + requestToken.oauth_token);
    })
  }
})

//Access Token request followed by the Access Token response
router.get('/callback', function (req, res) {
  var postBody = {
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
    var accessToken = qs.parse(data);
    //console.log(accessToken)
    //console.log(postBody.oauth.realmId)

    //The Access Token is stored in req.session.qbo
    req.session.qbo = {
      token: accessToken.oauth_token,
      secret: accessToken.oauth_token_secret,
      companyid: postBody.oauth.realmId
    };

    req.session.save(function (err) {
      // session saved
    })

    //Call getQbo to create a QBO object in order to make QBO requests
    let qbo = getQbo(req.session.qbo);

    //Call function InitialCalls, which gathers data required for the customer.ejs view
    var response = initialCalls(qbo);

    console.log('88888888888888888 done successfully8888888888888')

    //TODO: Store this infomration into MongoDB now

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
var initialCalls = function (qbo) {
  //The first QBO request made in this app is a query to get a list of Customers in the user's company
  qbo.findCustomers({
      limit: 10
    },
    function (e, searchResults) {
      customers = searchResults.QueryResponse.Customer;
      var db = app.dataSources.db;
      customers.forEach(
        function storeItem(value) {
          // Create a model from the user instance
          var Customer = db.buildModelFromInstance('Customer', value, {
            idInjection: true
          });

          // Use the model for create, retrieve, update, and delete
          var obj = new Customer(value);

          console.log(obj.toObject());

          Customer.create(value, function (err, u1) {
            console.log('Created: ', u1.toObject());
            Customer.findById(u1.id, function (err, u2) {
              console.log('Found: ', u2.toObject());
            });
          });
        })

    })

  //This request finds the first 10 items for which Customer tracking is enabled
  qbo.findItems({
      type: 'Inventory',
      limit: 10
    },
    function (e, searchResults) {
      items = searchResults.QueryResponse.Item;
      var db = app.dataSources.db;
      items.forEach(
        function storeItem(value) {
          // Create a model from the user instance
          var Inventory = db.buildModelFromInstance('Inventory', value, {
            idInjection: true
          });

          // Use the model for create, retrieve, update, and delete
          var obj = new Inventory(value);

          console.log(obj.toObject());

          Inventory.create(value, function (err, u1) {
            console.log('Created: ', u1.toObject());
            Inventory.findById(u1.id, function (err, u2) {
              console.log('Found: ', u2.toObject());
            });
          });
        }
      );
    }, this);

}

module.exports = router;
