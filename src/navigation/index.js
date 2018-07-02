// @flow
import * as React from 'react';
import { StackNavigator } from 'react-navigation';

type StoreProps = {
  navigation: Object,
};

type Props = StoreProps;

class HomeScreen extends React.Component<Props> {
  render() {
    return null;
  }
}

// eslint-disable-next-line babel/new-cap
export default StackNavigator({
  Home: {
    screen: HomeScreen,
  },
});
