// @flow
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  // Room Schema GIS application part
  /* 
    external_id: '001_20_OG05_063200',
    category_de: 'Projektraum',
    name: 'TC.5.11',
    room_name_en: 'TC.5.11',
    src: 'bach rooms',
    space_id: '5276',
    type: 'aks',
    building_name: 'TC',
    roomcode: 'TC.5.11',
    category_en: 'Project room',
    aks_nummer: '001_20_OG05_063200',
    room_name_de: 'TC.5.11',
    floor_num: '5',
    building: '8'
  */
  // Room Schema Rooms application part
  /* 
    "building": "D1",
		"category": "Student lounge",
		"pk_big": "001_20_OG01_353500",
		"label_verbose": "D1.1.050 Student lounge (30)",
		"size": 30,
		"bookable": 1,
		"id": 6446,
		"label": "D1.1.050"
 */
  name: String,
  building: String,
  level: String,
});

export default mongoose.model('Rooms', RoomSchema);
