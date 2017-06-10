'use strict';

const mongoose = require('mongoose');
const Room = mongoose.model('Rooms');

exports.get_all_rooms = function(req, res) {
  Room.find({}, (err, room) => (err ? res.send(err) : res.json(room)));
};
