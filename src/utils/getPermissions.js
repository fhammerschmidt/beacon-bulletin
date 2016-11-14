import { PermissionsAndroid } from 'react-native';

export async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.requestPermission(
      PermissionsAndroid.PERMISSIONS.LOCATION,
      {
        title: 'Please grant access to your location.',
        message: 'This app only works with access to fine and coarse location to interact with bluetooth beacons',
      }
    );
    if (granted) {
      console.log('PERMISSIONS.LOCATION access granted!');
    }
    else {
      console.log('PERMISSIONS.LOCATION access denied!');
    }
  }
  catch (error) {
    console.warn('Error setting permissions: ', error);
  }
}
