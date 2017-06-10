// @flow
const http = require('http'); // eslint-disable-line import/no-nodejs-modules

module.exports = function() {
  let data = null;

  const postData = JSON.stringify({
    method: 'searchAny',
    id: '',
    params: [{ searchString: 'D1.1.002' }],
    jsonrpc: '2.0',
  });

  const options = {
    method: 'POST',
    hostname: 'gis.wu.ac.at',
    port: null,
    path: '/wuwien_django/api/',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'content-length': Buffer.byteLength(postData),
      'cache-control': 'no-cache',
    },
  };

  const req = http.request(options, res => {
    const chunks = [];

    res.on('data', chunk => {
      chunks.push(chunk);
    });

    res.on('end', () => {
      const body = Buffer.concat(chunks);
      data = body.toString();
    });
  });

  req.write(postData);
  req.end();

  return data;
}
