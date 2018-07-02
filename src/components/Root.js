// @flow
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Navigation from '../navigation';

export default class Root extends React.Component<*> {
  render() {
    return (
      <View style={styles.container}>
        <Navigation />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
