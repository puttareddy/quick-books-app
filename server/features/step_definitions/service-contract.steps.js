'use strict';

module.exports = function () {

  this.When(/^I view the how the engine is configured$/, function (callback) {
    callback();
  });

  this.Then(/^I should see a method defined at .*/, function (callback) {
    callback();
  });

  this.Then(/^it should have the following arguments$/, function (table, callback) {
    callback();
  });

  this.Then(/^it should return .* from the "([^"]*)" collection in mongodb/, function (collection, table, callback) {
    callback();
  });
};
