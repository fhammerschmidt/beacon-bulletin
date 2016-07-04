'use strict';

var FetchMock = require('./fetch-mock');
var statusTextMap = require('./status-text');

module.exports = new FetchMock({
	theGlobal: window,
	Request: window.Request,
	Response: window.Response,
	Headers: window.Headers,
	statusTextMap: statusTextMap
});