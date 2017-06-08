'use strict';

const express = require('express');
const request = require('request');
const QuickBooks = require('node-quickbooks');
const qs = require('querystring');
const router = express.Router();
const port = process.env.PORT || 3006;
const qbConfig = require('../config').qb;

var consumerKey = qbConfig.consumerKey,
  consumerSecret = qbConfig.consumerSecret;

var customers, items;

//This route will take the Request Token and Initiate the User Authentication
router.get('/requestToken', function (req, res) {
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

    //Call getQbo to create a QBO object in order to make QBO requests
    let qbo = getQbo(req.session.qbo);

    //Call function InitialCalls, which gathers data required for the customer.ejs view
    var response = initialCalls(qbo);

    console.log('88888888888888888 done successfully8888888888888')

   //TODO: Store this infomration into MongoDB now

  })

  res.redirect('/explorer');  
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
    })

  //This request finds the first 10 items for which inventory tracking is enabled
  qbo.findItems({
      type: 'Inventory',
      limit: 10
    },
    function (e, searchResults) {
      items = searchResults.QueryResponse.Item;
    }, this)

}

module.exports = router;
