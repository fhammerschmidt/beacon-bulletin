// @flow
import { PermissionsAndroid } from 'react-native';
import Beacons from '@nois/react-native-beacons-manager';

export type Beacon = 'IBEACON' | 'ALTBEACON' | 'EDDYSTONE_TLM' | 'EDDYSTONE_UID' | 'EDDYSTONE_URL';

export type Region = { identifier: string, uuid: ?string };

// Beacon patterns are from here:
// https://github.com/AltBeacon/android-beacon-library/blob/master/src/main/java/org/altbeacon/beacon/BeaconParser.java
// and here (iBeacon):
// https://github.com/mmazzarolo/react-native-beacons-android/blob/master/index.js
// const beaconPatterns = {
//   ALTBEACON: 'm:2-3=beac,i:4-19,i:20-21,i:22-23,p:24-24,d:25-25',
//   EDDYSTONE_TLM: 'x,s:0-1=feaa,m:2-2=20,d:3-3,d:4-5,d:6-7,d:8-11,d:12-15',
//   EDDYSTONE_UID: 's:0-1=feaa,m:2-2=00,p:3-3:-41,i:4-13,i:14-19',
//   EDDYSTONE_URL: 's:0-1=feaa,m:2-2=10,p:3-3:-41,i:4-20v',
//   IBEACON: 'm:0-3=4c000215,i:4-19,i:20-21,i:22-23,p:24-24',
// };

export default function detectBeacons(region: Region, _beaconType: Beacon) {
  console.info('Scanning in progress...');
  Beacons.checkTransmissionSupported()
    .then(PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION))
    .then(requestCoarseLocationPermission)
    .then(Beacons.detectIBeacons);
  // .then(Beacons.detectCustomBeaconLayout(beaconPatterns[beaconType]));

  Beacons.startMonitoringForRegion(region)
    .then(() => console.log('Beacons monitoring started succesfully'))
    .catch(error => console.log(`Beacons monitoring not started, error: ${error}`));

  // Range beacons inside the region
  Beacons.startRangingBeaconsInRegion(region)
    .then(() => console.log('Beacons ranging started succesfully'))
    .catch(error => console.log(`Beacons ranging not started, error: ${error}`));
}

async function requestCoarseLocationPermission(): Promise<boolean> {
  const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION, {
    title: 'Please grant access to your (coarse) location.',
    message: 'This app only works with access to fine and coarse location to interact with bluetooth beacons',
  });

  return granted === PermissionsAndroid.RESULTS.GRANTED;
}
