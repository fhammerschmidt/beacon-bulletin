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

The app shall show a room in proximity of a certain beacon as soon as it is in near range. (i)Beacons define different proximity levels which helps to ignore beacons farer away (or placed on another level). Thus, there are possibly more beacons in proximity, but the signal strength is too low to actually categorize the beacon to be in near range.

## Getting room data from WU's BACH API

It appears, that the open BACH API of WU can be queried in many different ways, yielding valuable results for our needed room data.

First, we can query classes, e.g. from the current semester with a 4-digit class id. A sample query (HTTP GET over JSON-RPC) would look like the following:

```
GET /z/BachAPI/courses/get_events?verid=0117;semester=16W HTTP/1.1
Host: bach.wu.ac.at
[...]
```

and the corresponding response:

```
[
  ['16W', '0117', u'Object-oriented Development of Distributed Applications (OO2)', u'D2.0.030', u'D2', '2016-11-23T15:00:00', '2016-11-23T19:00:00'],
  ['16W', '0117', u'Object-oriented Development of Distributed Applications (OO2)', u'D2.0.030', u'D2', '2016-11-30T15:00:00', '2016-11-30T19:00:00'],
  ['16W', '0117', u'Object-oriented Development of Distributed Applications (OO2)', u'D2.0.030', u'D2', '2016-12-07T15:00:00', '2016-12-07T19:00:00'],
  ['16W', '0117', u'Object-oriented Development of Distributed Applications (OO2)', u'D2.0.030', u'D2', '2016-12-14T15:00:00', '2016-12-14T19:00:00'],
  ['16W', '0117', u'Object-oriented Development of Distributed Applications (OO2)', u'D2.0.030', u'D2', '2016-12-21T15:00:00', '2016-12-21T19:00:00'],
  ['16W', '0117', u'Object-oriented Development of Distributed Applications (OO2)', u'D2.0.030', u'D2', '2017-01-11T15:00:00', '2017-01-11T19:00:00'],
  ['16W', '0117', u'Object-oriented Development of Distributed Applications (OO2)', u'D2.0.030', u'D2', '2017-01-18T15:00:00', '2017-01-18T19:00:00']
]
```

which is every single class unit of that semester of this class (with id 117). Easily to be seen, the 4th parameter is the room number, but what is that variable's name?

Unfortunately, it appears that there is currently no query to get all the classes for a given room. At least, the GIS Api can be used to get more information about seminar or project rooms, or other points of interest on the campus.

Therefore, a HTTP POST command to http://gis.wu.ac.at/wuwien_django/api/ with a message body like the following can be used:

```json
{
  "method": "searchAny",
  "id": "",
  "params": [{"searchString": "D2.0.030"}],
  "jsonrpc":"2.0"
}
```
which is the method used by the search box on gis.wu.ac.at. The id is mandatory but can also be an empty string. The above request yields the following response body:

```json
{
  "jsonrpc": "2.0",
  "id": "",
  "result": {
    "building": "",
    "length": 1,
    "searchString": "D2.0.030",
    "searchResult": [
      {
        "aks_nummer": "001_30_EG01_012000",
        "roomcode_value": "D2.0.030",
        "entrance": "10280",
        "layer": "0",
        "name_de": "D2.0.030",
        "orgid": "",
        "category_en": "Seminar room",
        "name_en": "D2.0.030",
        "category_de": "Seminarraum",
        "building": "D2",
        "src": "bach",
        "frontoffice": "",
        "geometry": "{\"type\":\"MultiPolygon\",\"coordinates\":[...<left out for brevity...]}",
        "type": "room/eg00",
        "entrance_name_de": "D2 Eingang C",
        "centerGeometry": "{\"type\":\"Point\",\"coordinates\":[1826593.62815352,6142325.67288426]}",
        "external_id": "217",
        "entrance_name_en": "D2 Entrance C"
      }
    ]
  }
}
```

In the searchResult, some valuable attributes like the building name or layer (level) can be found, which means the GIS Api can be used to gather all the rooms with their corresponding buildings and levels programmatically.

The only missing input now is a list of all (bookable) rooms of the campus which can then be processed room-by-room and stored in a JSON file. The beacons on the other hand have to be installed one-by-one anyway, so the manual creation of the list is feasible. Also, if another beacon is added to the list, it is as simple as a push to the corresponding array.

A good place to get such a list is the actual room booking tool "Rooms for students", as it already has a "list all rooms" option. When checking the request/response via Chrome's network tab, it delivers another JSON which looks like this:

```json
[
  {"slots": [], "id": 6440, "label": "D1.1.002 Projektraum (8)"},
  {"slots": [], "id": 6315, "label": "D1.1.028 Projektraum (8)"},
  {"slots": [], "id": 6265, "label": "D1.1.010 Projektraum (8)"},
  {"slots": [], "id": 6425, "label": "D1.1.006 Projektraum (8)"}
]
```

Here we can only find the room codes in the labels as they work with an internal ID not exposed to the user. But, (assumed the JSON data is stored in a `rooms` object) a simple ES6 map function in conjunction with a substring

```javascript
rooms.map(room => room.label.substring(0, room.label.indexOf(' ')));
```
yields an array of strings with just the names of the rooms:
```json
["D1.1.002", "D1.1.028", "D1.1.010", "D1.1.006"]
```

Now, we can feed this already to the GIS API with a little script, to retrieve all the necessary room information. For a Proof of concept, a simple bash/curl script is sufficient.

```bash
curl -X POST \
-H "Content-Type: application/x-www-form-urlencoded" \
-H "Cache-Control: no-cache" \
-H "Postman-Token: 2cbec2a6-fe3c-3e60-abc3-45da13ffe782" \
-d '{"method": "searchAny", "id": "", "params": [{"searchString": "D1.1.002 Projektraum (8)"}], "jsonrpc":"2.0"}' \
"http://gis.wu.ac.at/wuwien_django/api/"
```

and call this script for each entry of the room list:
```bash
xargs curlWuGis.sh <roomlist.json
```
