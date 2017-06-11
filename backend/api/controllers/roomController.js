'use strict';

const mongoose = require('mongoose');
const Room = mongoose.model('Rooms');

exports.get_all_rooms = function(req, res) {
  Room.find({}, (err, room) => (err ? res.send(err) : res.json(room)));
};

exports.add_a_room = function(req, res) {
  // store list of rooms
  if (req.body instanceof Array) {
    req.body.map(room => {
      const new_room = new Room(storeRoom(room));
      new_room.save((err, room) => (err ? res.send(err) : res));
    });
  } else {
    // store single room
    const new_room = new Room(storeRoom(room));
    new_room.save((err, room) => (err ? res.send(err) : res.json(room)));
  }
};

exports.get_a_room = function(req, res) {
  Room.findById(req.params.roomId, (err, room) => (err ? res.send(err) : res.json(room)));
};

exports.delete_a_room = function(req, res) {
  Room.findByIdAndRemove(req.params.roomId,
    (err, room) => (err ? res.send(err) : res.json({ message: 'Room successfully deleted' }))
  );
};

function storeRoom(room) {
  // Create room model object from single string.
  return {
    name: room,
    building: room.substring(0, room.indexOf('.')),
    level: room.substring(room.indexOf('.') + 1, room.lastIndexOf('.')),
  };
}
