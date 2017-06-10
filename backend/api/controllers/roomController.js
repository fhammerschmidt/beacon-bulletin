'use strict';

const mongoose = require('mongoose');
const Room = mongoose.model('Rooms');

exports.get_all_rooms = function(req, res) {
  Room.find({}, (err, room) => (err ? res.send(err) : res.json(room)));
};

exports.add_a_room = function(req, res) {
  const new_room = new Room(req.body);
  new_room.save((err, room) => (err ? res.send(err) : res.json(room)));
};

exports.get_a_room = function(req, res) {
  Room.findById(req.params.roomId, (err, room) => (err ? res.send(err) : res.json(room)));
};

exports.delete_a_room = function(req, res) {
  Room.remove(
    { id: req.params.roomId },
    (err, room) => (err ? res.send(err) : res.json({ message: 'Room successfully deleted' }))
  );
};
