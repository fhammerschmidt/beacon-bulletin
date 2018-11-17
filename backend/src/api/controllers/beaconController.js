// @flow
import { Beacon } from '../models';

// GET /beacons
export function getAllBeacons(req: express$Request, res: express$Response) {
  Beacon.find()
    .then(beacon => res.json(beacon))
    .catch(err => res.send(err));
}

// POST /beacons
export function addBeacons(req: express$Request, res: express$Response) {
  if (req.body instanceof Array) {
    Beacon.insertMany(req.body)
      .then(beacons => {
        res.json(beacons);
      })
      .catch(err => {
        res.send(err);
      });
  } else {
    res.send('Can not store room, unsupported or unknown type.');
  }
}

// GET /beacons/{beaconId}
export function getBeacon(req: express$Request, res: express$Response) {
  Beacon.findById(req.params.beaconId)
    .then(beacon => res.json(beacon))
    .catch(err => res.send(err));
}

// PUT /beacons/{beaconId}
export function updateBeacon(req: express$Request, res: express$Response) {
  Beacon.findOneAndUpdate(req.params.beaconId, req.body, { new: true })
    .then(beacon => res.json(beacon))
    .catch(err => res.send(err));
}

// DELETE /beacons/{beaconId}
export function deleteBeacon(req: express$Request, res: express$Response) {
  Beacon.findOneAndRemove(req.params.beaconId)
    .then(() => res.json({ message: 'Beacon successfully deleted' }))
    .catch(err => res.send(err));
}
