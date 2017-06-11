'use strict';

const _ = require('lodash');
const chai = require('chai');
const expect = chai.expect;

module.exports = function () {

  function buildRegex(pattern) {
    if (pattern !== undefined) {
      const parts = pattern.split('/');

      if (parts.length > 1) {
        const regex = parts[1];
        const options = parts[2];
        return RegExp(regex, options);
      }
    }

    return false;
  }

  function expectMatchOrEqual(response, field, expectedValue) {
    const regex = buildRegex(expectedValue);
    if (regex) {
      expect(response.data[field]).to.match(regex);
    } else if (expectedValue) {
      expect('' + response.data[field]).to.eql(expectedValue);
    } else {
      expect(response.data[field]).to.not.be.undefined;
    }
    return regex;
  }

  this.Given(/^request headers$/i, function (data) {
    this.headers = data.rowsHash();
  });

  this.Given(/^the json request data$/i, function (data) {
    this.requestBody = JSON.parse(data);
  });

  this.Given(/^the property "(.*)" is set to "(.*)"$/i, function (path, value) {
    this.requestBody = this.requestBody || {};
    _.set(this.requestBody, path, value);
  });

  this.Given(/^the property "(.*)" is set to the response property "(.*)"$/i, function (path, oldPath) {
    this.requestBody = this.requestBody || {};
    _.set(this.requestBody, path, _.get(this.actualResponse, oldPath));
  });

  this.When(/^I GET from "(.*)"$/i, function (uri) {
    return this.httpGet(uri);
  });

  this.When(/^I DELETE from "(.*)"$/i, function (uri) {
    return this.httpDelete(uri);
  });

  this.When(/^I POST to "(.*)" with$/i, function (uri, data) {
    this.requestBody = JSON.parse(data);
    return this.httpPost(uri);
  });

  this.When(/^I POST to "(.*)"$/i, function (uri) {
    return this.httpPost(uri);
  });

  this.Then(/^the response should be "(.*)"$/i, function (expectedResponse, callback) {
    expect(this.actualResponse).to.equal(expectedResponse);
    callback();
  });

  this.Then(/^the response should be$/i, function (data, callback) {
    let expectedResponse = JSON.parse(data);
    expect(this.actualResponse).to.eql(expectedResponse);
    callback();
  });

  this.Then(/^the response should contain$/, function (data, callback) {
    const fields = data.hashes();

    fields.forEach(field => {
      expectMatchOrEqual(this.actualResponse, field.Field, field.Value);
    });
    callback();
  });

  this.Then(/^the property "(.*)" should be "(.*)"$/i, function (field, expectedValue, callback) {
    expectMatchOrEqual(this.actualResponse, field, expectedValue);
    callback();
  });

  this.Then(/^the property "(.*)" should be a "(.*)"$/i, function (property, expectedType, callback) {
    expect(this.actualResponse.data[property]).to.be.a(expectedType);
    callback();
  });

  this.Then(/^the response status should be "(\d+)"$/i, function (expectedValue, callback) {
    expect(this.statusCode).to.equal(parseInt(expectedValue));
    callback();
  });

  this.Then(/^the property "([^"]*)" should be required$/, function (property, callback) {
    expect(this.actualResponse.data[property]).to.not.be.undefined;
    callback();
  });

  this.Then(/^the property "([^"]*)" should be optional/, function (property, callback) {
    callback();
  });
};
