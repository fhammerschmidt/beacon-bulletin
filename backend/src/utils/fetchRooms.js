// @flow
import axios from 'axios';

export default function fetchRooms() {
  const data = [];

  axios
    .get('https://bach.wu.ac.at/d/rr/api/rooms/', {})
    .then(res => {
      const rooms = res.data.filter(room => room.category === 'Project room').map(room => room.label.trim());

      // eslint-disable-next-line array-callback-return
      rooms.map(room => {
        axios
          .get(`https://campus.wu.ac.at/de/search/${room}?format=json`)
          .then(res1 => {
            // Room properties are stored in the GET responses features array (it is from a map feature).
            data.push(res1.data.features[0].properties);
          })
          .catch(err => {
            console.log('Error retrieving room properties', err);
          });
      });
    })
    .catch(err => {
      console.log('Error', err);
    });

  return data;
}
