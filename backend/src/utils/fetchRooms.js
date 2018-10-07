// @flow
import axios from 'axios';

import { Room } from '../api/models';
import storeBachApiRoom from './storeBachApiRoom';

export default function fetchRooms() {
  axios
    .get('https://bach.wu.ac.at/d/rr/api/rooms/', {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
    .then(res => {
      res.data.filter(room => room.category === 'Project room').map(room => {
        const newRoom = new Room(storeBachApiRoom(room));
        return newRoom.save((err, created) => (err ? console.log(err) : console.log(created, ' stored successfully')));
      });

      // eslint-disable-next-line array-callback-return
      // rooms.map(room => {
      //   axios
      //     .get(`https://campus.wu.ac.at/de/search/${room}?format=json`)
      //     .then(res1 => {
      //       // Room properties are stored in the GET responses features array (it is from a map feature).
      //       data.push(res1.data.features[0].properties);
      //     })
      //     .catch(err => {
      //       console.log('Error retrieving room properties', err);
      //     });
      // });
    })
    .catch(err => {
      console.log('Error retrieving rooms:', err);
    });
}
