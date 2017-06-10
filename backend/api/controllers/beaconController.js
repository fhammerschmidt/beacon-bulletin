'use string';

const mongoose = require('mongoose');
const Beacon = mongoose.model('Beacons');

exports.get_all_beacons = function(req, res) {
  Beacon.find({}, (err, beacon) => (err ? res.send(err) : res.json(beacon)));
};

exports.add_a_beacon = function(req, res) {
  const new_beacon = new Beacon(req.body);
  new_beacon.save((err, beacon) => (err ? res.send(err) : res.json(beacon)));
};

exports.get_a_beacon = function(req, res) {
  Beacon.findById(req.params.beaconId, (err, beacon) => (err ? res.send(err) : res.json(beacon)));
};

exports.update_a_beacon = function(req, res) {
  Beacon.findOneAndUpdate(
    req.params.beaconId,
    req.body,
    { new: true },
    (err, beacon) => (err ? res.send(err) : res.json(beacon))
  );
};

exports.delete_a_beacon = function(req, res) {
  Beacon.remove(
    { id: req.params.beaconId },
    (err, beacon) => (err ? res.send(err) : res.json({ message: 'Beacon successfully deleted' }))
  );
};
