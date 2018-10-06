// @flow
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import _Beacon from './api/models/beaconModel';
import _Room from './api/models/roomModel';
import routes from './api/routes';
import fetchRooms from './utils/fetchRooms';

const app: express$Application = express();
const port = process.env.PORT || 1337;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://db/app', {
  useMongoClient: true,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

app.use((req: express$Request, res: express$Response) => {
  res.status(404).send({ url: `${req.originalUrl} not found` });
});

app.listen(port, () => {
  console.log(`Beacon Bulletin Server was started on port: ${port}`);
  fetchRooms();
});
