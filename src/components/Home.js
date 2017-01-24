// @flow
import React, { Component } from 'react';
import { DrawerLayoutAndroid, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { actions as navigationActions } from 'react-native-navigation-redux-helpers';

import { PRIMARY_APP_COLOR } from '../constants';
import type { ReduxState } from '../reducers';
import type { Dispatch } from '../actions';
import { HomeRoute } from '../routes';
import BeaconDetector from './BeaconDetector';
import MenuRow from './MenuRow';
import RoomList from './RoomList';
import Settings from './Settings';
import BeaconBulletinIcons from './BeaconBulletinIcons';

const { jumpTo, pushRoute } = navigationActions;

const toolbarHeight = 56;

function mapStateToProps(state: ReduxState) {
  return {
    navigation: state.navigationTabs,
  };
}

class Home extends Component {
  drawer: Object;
  props: {
    navigation: Object,
    dispatch: Dispatch,
  };

  render() {
    const selectedTab = this.props.navigation.routes[this.props.navigation.index];

    return (
      <DrawerLayoutAndroid
        ref={this.setDrawerRef}
        drawerBackgroundColor={PRIMARY_APP_COLOR}
        drawerWidth={300}
        drawerPostion={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={this.renderNavigationView}
        statusBarBackgroundColor={PRIMARY_APP_COLOR}
      >
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
        return <BeaconDetector/>;
      case 'settings':
        return <Settings />;
      case 'rooms':
      default:
        return <RoomList />;
    }
  }

  handleActionSelected = position => {
    if (position === 0) {
      this.props.dispatch(pushRoute(HomeRoute), 'global');
    }
  };

  setDrawerRef = drawer => {
    this.drawer = drawer;
  };

  renderNavigationView = () => {
    const { navigation } = this.props;
    return (
      <View style={styles.drawer}>
        {navigation.routes.map((r, i, a) =>
          <View key={i}>
            { i < a.length && <Separator /> }
            <MenuRow onPress={this.handleNavigate} key={r.key} route={r} index={i}/>
          </View>
        )}
        <Separator />
      </View>
    );
  }

  handleIconClicked = () => {
    this.drawer.openDrawer();
  };

  handleNavigate = index => {
    this.handleJump(jumpTo(index, 'tabs'));
  };

  handleJump = action => {
    this.drawer.closeDrawer();
    this.props.dispatch(action);
  };
}

function Separator(props) {
  return (
    <View style={[ styles.separator, props.style ]}/>
  );
}

export default connect(mapStateToProps)(Home);

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
