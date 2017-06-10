'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  name: String,
  building: String,
  level: String,
});

module.exports = mongoose.model('Rooms', RoomSchema);
