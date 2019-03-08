// @flow
import * as React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { connect, type Connector } from 'react-redux';
import { type BeaconRegion } from '@nois/react-native-beacons-manager';

import type { Beacon } from '../../common/apiTypes';
import type { ReduxState } from '../reducers';
import { beaconListSelector } from '../reducers/data';
import UserInfoView from './UserInfoView';
import BeaconCell from './BeaconCell';

type OwnProps = {
  navigation: any,
  beacons?: BeaconRegion[],
};

type StoreProps = {
  beaconList: Beacon[],
};

type Props = OwnProps & StoreProps;

function mapStateToProps(state: ReduxState): StoreProps {
  return {
    beaconList: beaconListSelector(state),
  };
}

class BeaconList extends React.Component<Props> {
  render() {
    const { beaconList, beacons } = this.props;
    if (beacons) {
      if (beacons.length > 0) {
        const found = beacons.filter(
          b =>
            !beaconList.some(bs => {
              return bs.major === b.major.toString() && bs.minor === b.minor.toString();
            })
        );
        if (found.length > 0) {
          return (
            <View style={styles.list}>
              <FlatList data={found} renderItem={this.renderItem} keyExtractor={this.keyExtractor} />
            </View>
          );
        }
      }
    }
    return <UserInfoView message="Scanning for beacons with no room assigned..." />;
  }

  renderItem = ({ item }: { item: BeaconRegion }) => {
    return <BeaconCell key={item.id} beacon={item} onRowPressed={this.handleRowPressed} />;
  };

  keyExtractor = (item: BeaconRegion, index: number) => index.toString();

  handleRowPressed = (beacon: BeaconRegion) => {
    this.props.navigation.navigate('AddBeacon', { beacon });
  };
}

const connector: Connector<OwnProps, Props> = connect(mapStateToProps);
export default connector(BeaconList);

const styles = StyleSheet.create({
  list: {
    paddingTop: 16,
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingHorizontal: 16,
  },
});
