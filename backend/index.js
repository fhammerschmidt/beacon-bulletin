// @flow
import http from 'http'; // eslint-disable-line import/no-nodejs-modules
import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';

const app = express();
const DEFAULT_PORT = 3000;

const rooms = collectRooms();

app.use(bodyParser.json());

// Connection URL
const dbUrl = 'mongodb://localhost:27017/myproject';

// Use connect method to connect to the server
MongoClient.connect(dbUrl, (err, db) => {
  console.log('Connected successfully to server');

insertDocuments(db, () => {
  db.close();
});


app.get('/', (req, res) => {
  res.send('Hello Internet!');
});

app.get('/beacons', (req, res) => {
  res.send(/* beacons*/);
});

app.get('/rooms', (req, res) => {
  const rooms1 = app.get('rooms');
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(rooms1, null, 3));
});

app.listen(DEFAULT_PORT, () => {
  console.log(`Example app listening on port ${DEFAULT_PORT}`);
});

function collectRooms() {
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
