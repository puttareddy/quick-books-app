'use strict';

const _ = require('lodash');
const request = require('supertest');
const app = require('../../server/server');

function World() {
  const self = this;

  function json(verb, url, headers) {
    const requestWithHeaders = request(app)[verb](url);

    for (let key in headers) {
      requestWithHeaders.set(key, headers[key]);
    }

    return requestWithHeaders;
  }

  function _httpRequest(options) {
    return json(options.method, options.uri, self.headers)
      .send(self.requestBody).then(function (response) {
        self.statusCode = response.statusCode;
        self.actualResponse = response.body;
      }, function (response) {
        const bodyString = response.message.slice(6);
        self.actualResponse = JSON.parse(bodyString);
        self.statusCode = response.statusCode;
      });
  }

  this.httpGet = function (uri) {
    return _httpRequest({
      method: 'get',
      uri: uri
    });
  };

  this.httpDelete = function (uri) {
    return _httpRequest({
      method: 'delete',
      uri: uri
    });
  };

  this.httpPost = function (uri) {
    return _httpRequest({
      method: 'post',
      uri: uri
    });
  };

  this.getValue = function (path) {
    return _.get(self.actualResponse, path);
  };

  this.prettyPrintJSON = function (json) {
    return JSON.stringify(json, null, '  ');
  };

  this.prettyPrintError = function (actualValue, expectedValue) {
    return `\r\nExpected: ${expectedValue}\r\nActual: ${actualValue}\r\nRequest Body:\r\n${self.prettyPrintJSON(self.requestBody)}\r\nResponse Status Code: ${self.statusCode}\r\nResponse Body:\r\n${self.prettyPrintJSON(self.actualResponse)}`;
  };
}

module.exports = function () {
  this.World = World;
};
