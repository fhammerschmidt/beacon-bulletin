// @flow
import * as React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import Root from './components/Root';

const store = configureStore({});

class BeaconBulletin extends React.Component<*> {
  render() {
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('BeaconBulletin', () => BeaconBulletin);
