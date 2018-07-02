// @flow
import * as React from 'react';
import { DrawerLayoutAndroid, StyleSheet, View } from 'react-native';
import { connect, type Connector } from 'react-redux';

import { PRIMARY_APP_COLOR } from '../constants';
import type { ReduxState } from '../reducers';
import type { DispatchProps } from '../actions';
import BeaconDetector from './BeaconDetector';
import MenuRow from './MenuRow';
import RoomList from './RoomList';
import Settings from './Settings';
import BeaconBulletinIcons from './BeaconBulletinIcons';

const toolbarHeight = 56;

function mapStateToProps(_state: ReduxState): StoreProps {
  return {
    navigation: {},
  };
}

type StoreProps = {
  navigation: Object,
};

type Props = StoreProps & DispatchProps;

class Home extends React.Component<Props> {
  drawer: Object;

  render() {
    const selectedTab = this.props.navigation.routes[this.props.navigation.index];

    return (
      <DrawerLayoutAndroid
        drawerBackgroundColor={PRIMARY_APP_COLOR}
        drawerWidth={300}
        drawerPostion={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={this.renderNavigationView}
        statusBarBackgroundColor={PRIMARY_APP_COLOR}>
        <BeaconBulletinIcons.ToolbarAndroid
          title="Beacon Bulletin"
          style={styles.toolbar}
          titleColor="white"
          navIconName="view_headline"
          onIconClicked={this.handleIconClicked}
        />
        {this.renderMenuItemContent(selectedTab)}
      </DrawerLayoutAndroid>
    );
  }

  renderMenuItemContent(tab) {
    switch (tab.key) {
      case 'beacons':
        return <BeaconDetector />;
      case 'settings':
        return <Settings />;
      case 'rooms':
      default:
        return <RoomList />;
    }
  }

  renderNavigationView = () => {
    const { navigation } = this.props;
    return (
      <View style={styles.drawer}>
        {navigation.routes.map((r, i, a) => (
          <View key={i}>
            {i < a.length && <Separator />}
            <MenuRow onPress={this.handlePress} key={r.key} route={r} index={i} />
          </View>
        ))}
        <Separator />
      </View>
    );
  };

  handleIconClicked = () => {
    this.drawer.openDrawer();
  };

  handleJump = action => {
    this.drawer.closeDrawer();
    this.props.dispatch(action);
  };

  handlePress = () => {
    // TODO
  };
}

function Separator() {
  return <View style={styles.separator} />;
}

const connector: Connector<{}, Props> = connect(mapStateToProps);
export default connector(Home);

const styles = StyleSheet.create({
  drawer: {
    marginTop: toolbarHeight + 24,
  },
  toolbar: {
    height: toolbarHeight,
    backgroundColor: PRIMARY_APP_COLOR,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'black',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'white',
  },
});
