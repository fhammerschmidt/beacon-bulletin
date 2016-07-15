# beacon-bulletin Documentation

## Idea
This application utilizes the react-native-beacons-* libraries to interact with any type of bluetooth low energy beacons. The only limitation is, that the iOS app limits the user to detect iBeacons. Android, on the other hand, supports all major beacon types so far.

## Functional description: App
The functions of the app include the following:
* The app needs to use one UUID for all the beacons used in one environment. This ensures that no foreign beacons disturb the function of the app. They are further subdivided by their major and minor id parts. For instance one could use major for every building and minor for every room.
* The app needs to auto-update every few seconds, but this must not affect the GUI too often, as it is especially hard to click on the right beacon item when there are others popping up.
* The app needs to filter unwanted bluetooth devices which are no kind of beacon. This however is already done by the built-in UUID-Filter. The UUID includes all the information necessary to determine that there are only bluetooth beacons shown.
* The main task of the app is to look for surrounding beacons and match them with the current room-configuration downloaded of some backend. For this use-case one dummy backend will be sufficient.
* After a match, the app will show the room(s) found.
* By pressing one of them, an information panel will appear, showing interesting information about the rooms size (in seats), current and upcoming classes held, and if it is a project room also a "book room now" button for a pre-defined time interval, e.g. one hour.
  * The "book room now" button needs to implement logic to offset the booking if the room is occupied or change it's appearance to something like "book this room when available"
* The available room list needs to be cached on the client side for fast access and low network bandwidth, therefore the list is stored on the devices local storage and only changed when there are updates to the room layouts or more rooms get equipped with beacons.
* Classes on the other hand, are queried from the class directory via a REST call where they just need to match the rooms nearby. This is due to two reasons. First, the classes change more frequently, sometimes because of lack of space some are assigned to other rooms or whole classes can be cancelled due to illness of the class teacher, or the like. Second, it keeps the apps local size tiny.

  * The redux store is a very nested Javascript-Object which resembles some JSON-Layout, therefore it is a good idea to get RESTful JSON-Content on request.

##### The JSON-Layout is shown below:

```json
{
  "rooms": [
    { "id": 1, "building": "D2", "level": "0", "fullName": "D2.0.0.30" },
    { "id": 2, "building": "D1", "level": "1", "fullName": "D1.1.0.40" }
  ],
  "beacons": [
    { "id": 5, "major": 12, "minor": 20, "rooms": [ 1, 3 ] },
    { "id": 7, "major": 12, "minor": 21, "rooms": [ 6, 7 ] },
    { "id": 2, "major": 13, "minor": 10, "rooms": [ 4 ] }
  ]
}
```

As can be seen, a flat structure is being used instead of a deep-nested hierarchy to keep it simple. We only need the rooms internal id to match them with the available beacons and the app just has a list of all available rooms and beacons in the store.
