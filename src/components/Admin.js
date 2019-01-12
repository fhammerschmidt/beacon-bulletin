// @flow
import * as React from 'react';
import { View, Text } from 'react-native';

type OwnProps = {
  // navigation: any,
};

type StoreProps = {};

type Props = OwnProps & StoreProps;

export default class Admin extends React.Component<Props> {
  render() {
    return (
      <View>
        <Text> Hallööööö </Text>
      </View>
    );
  }
}
