import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BeaconDetector from './BeaconDetector';
import RoomList from './RoomList';

export default class Root extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headline}>
          Beacon Bulletin
        </Text>
        <RoomList />
        <BeaconDetector/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  headline: {
    alignSelf: 'center',
    fontSize: 20,
    paddingVertical: 10,
  },
});
