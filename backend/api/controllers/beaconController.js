// @flow
import { Beacon } from '../models';

export function getAllBeacons(req: express$Request, res: express$Response) {
  Beacon.find({}, (err, beacon) => (err ? res.send(err) : res.json(beacon)));
}

export function addBeacon(req: express$Request, res: express$Response) {
  const newBeacon = new Beacon(req.body);
  newBeacon.save((err, beacon) => (err ? res.send(err) : res.json(beacon)));
}

export function getBeacon(req: express$Request, res: express$Response) {
  Beacon.findById(req.params.beaconId, (err, beacon) => (err ? res.send(err) : res.json(beacon)));
}

export function updateBeacon(req: express$Request, res: express$Response) {
  Beacon.findOneAndUpdate(
    req.params.beaconId,
    req.body,
    { new: true },
    (err, beacon) => (err ? res.send(err) : res.json(beacon))
  );
}

export function deleteBeacon(req: express$Request, res: express$Response) {
  Beacon.remove(
    { id: req.params.beaconId },
    (err, _beacon) => (err ? res.send(err) : res.json({ message: 'Beacon successfully deleted' }))
  );
}
