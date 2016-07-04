'use strict';

var fetch = require('node-fetch');
var Request = fetch.Request;
var Response = fetch.Response;
var Headers = fetch.Headers;
var stream = require('stream');
var FetchMock = require('./fetch-mock');
var http = require('http');

module.exports = new FetchMock({
	theGlobal: global,
	Request: Request,
	Response: Response,
	Headers: Headers,
	stream: stream,
	statusTextMap: http.STATUS_CODES
});