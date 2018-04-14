// @flow
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Beacon = require('./api/models/beaconModel');
const Room = require('./api/models/roomModel');
const fetchRooms = require('./utils/fetchRooms');

const app = express();
const port = process.env.PORT || 3000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://db/app', {
  useMongoClient: true,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = require('./api/routes');
routes(app);

app.use((req, res) => {
  res.status(404).send({ url: req.originalUrl + ' not found' });
});
app.listen(port, () => fetchRooms());

console.log('Beacon Bulletin Server was started on port: ' + port);
