// @flow
import Beacons, { type BeaconRegion } from '@nois/react-native-beacons-manager';
import { type Region } from './detectBeacons';

export function filterBeacons(nb: BeaconRegion, beacons: Array<BeaconRegion>): Array<BeaconRegion> {
  const diffBeacon = data => !(data.uuid === nb.uuid && data.minor === nb.minor && data.major === nb.major);

  const diffBeacons = [...beacons.filter(diffBeacon).sort((a, b) => b.distance - a.distance), nb];
  // Kick out old beacons after being not in range for 30 seconds (30000ms).
  const keptBeacons = diffBeacons.filter(b => nb.time - b.time < 30000);
  return keptBeacons.sort((a, b) => {
    console.log(b, a);
    return a.distance - b.distance;
  });
}

export function createRegion(
  response: { beacons: BeaconRegion[], uuid: string, identifier: string },
  beacon: BeaconRegion
) {
  return {
    identifier: response.identifier,
    uuid: String(beacon.uuid),
    major: parseInt(beacon.major, 10) >= 0 ? beacon.major : '',
    minor: parseInt(beacon.minor, 10) >= 0 ? beacon.minor : '',
    proximity: beacon.proximity ? beacon.proximity : '',
    rssi: beacon.rssi ? beacon.rssi : '',
    distance: beacon.distance ? beacon.distance : 0,
    time: new Date().getTime(),
  };
}

export async function startRangingAndMonitoring(region: Region) {
  try {
    await Beacons.startRangingBeaconsInRegion(region);
    console.log('Beacons ranging started successfully');
    await Beacons.startMonitoringForRegion(region);
    console.log('Beacons monitoring started successfully');
  } catch (error) {
    throw error;
  }
}

export async function stopRangingAndMonitoring(region: Region) {
  try {
    await Beacons.stopRangingBeaconsInRegion(region);
    console.log('Beacons ranging stopped successfully');
    await Beacons.stopMonitoringForRegion(region);
    console.log('Beacons monitoring stopped successfully');
  } catch (error) {
    throw error;
  }
}
