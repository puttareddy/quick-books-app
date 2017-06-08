'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var logger = require('loopback-component-logger')();
var app = module.exports = loopback();
var cookieSession = require('cookie-session'); //creating a cookie session to persist the oauth information
var sync = require('./routes/sync');

app.use(cookieSession({
  name: 'session',
  keys: ['key1']
}))

app.all('*', function (req, res, next) {
  if (process.env.HOST === undefined) {
    var host = req.headers.host.replace(/:\d+$/, '');
    process.env.HOST = host;
    process.env.CUSTOM_CALLBACK_URI = '//' + host + '/sync/callback/';
  }
  next('route');
});

//app.set('routes', './routes');
app.use('/sync', sync);


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
