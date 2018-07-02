// @flow
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Settings extends React.Component<*> {
  render() {
    return (
      <View style={styles.settings}>
        <Text>This is the settings screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  settings: {
    paddingTop: 16,
    paddingHorizontal: 16,
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});
