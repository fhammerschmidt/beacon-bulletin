// @flow
import * as React from 'react';
import { AppRegistry, YellowBox } from 'react-native';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import Root from './components/Root';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
const { store } = configureStore({});

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
