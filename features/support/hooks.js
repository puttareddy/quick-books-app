'use strict';

const reporter = require('cucumber-html-reporter');

const hooks = function () {

  this.registerHandler('AfterFeatures', (features, callback) => {
    var options = {
      theme: 'bootstrap',
      jsonDir: 'reports/cucumber',
      output: 'reports/cucumber_report.html',
      reportSuiteAsScenarios: true,
      launchReport: false,
      metadata: {
        'Engine Version': process.env.npm_package_version
      }
    };
    reporter.generate(options);
    callback();
  });
};

module.exports = hooks;
