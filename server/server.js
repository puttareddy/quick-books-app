'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
const path = require('path');
var logger = require('loopback-component-logger')();
var app = module.exports = loopback();
var cookieParser = require('cookie-parser');
var session = require('express-session');
var cookieSession = require('cookie-session'); //creating a cookie session to persist the oauth information
var sync = require('./routes/sync');
const buildPath = path.join(__dirname, '../client/build')

app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!"}));

// Use the session middleware 
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 5000 }}))
 
//app.set('routes', './routes');
app.use('/sync', sync);

app.use(loopback.static(buildPath));

app.start = function () {
  // start the web server
  return app.listen(function () {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function (err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
