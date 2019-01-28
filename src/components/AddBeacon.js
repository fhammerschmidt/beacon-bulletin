// @flow
import * as React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { connect, type Connector } from 'react-redux';
import { type BeaconRegion } from '@nois/react-native-beacons-manager';

import type { ApiBeacon, Room } from '../../apiTypes';
import { postBeacon, type DispatchProps } from '../actions';
import type { ReduxState } from '../reducers';
import { roomsWithNoBeaconsSelector } from '../reducers/data';
import RoomCell from './RoomCell';

type OwnProps = {
  beacon: BeaconRegion,
  onBackPress: () => void,
};

type StoreProps = {
  rooms: Array<Room>,
};

type Props = OwnProps & StoreProps & DispatchProps;

function mapStateToProps(state: ReduxState): StoreProps {
  return {
    rooms: roomsWithNoBeaconsSelector(state),
  };
}

class AddBeacon extends React.Component<Props> {
  render() {
    const { beacon, rooms } = this.props;

    return (
      <View style={styles.list}>
        <Text>
          Add room to beacon with major: {beacon.major.toString()} and minor: {beacon.minor.toString()}
        </Text>
        <FlatList data={rooms} renderItem={this.renderItem} keyExtractor={this.keyExtractor} />
      </View>
    );
  }

  renderItem = ({ item }: { item: Room }) => {
    return <RoomCell key={item.id} room={item} onRowPressed={this.handleAddBeaconSubmit} />;
  };

  keyExtractor = (item: Room, index: number) => index.toString();

  handleAddBeaconSubmit = (room: Room) => {
    const { beacon, dispatch, onBackPress } = this.props;
    const apiBeacon: ApiBeacon = {
      region: beacon.uuid,
      major: beacon.major.toString(),
      minor: beacon.minor.toString(),
      assignedRooms: [room.name],
    };
    dispatch(postBeacon(apiBeacon));
    onBackPress();
  };
}

const connector: Connector<OwnProps, Props> = connect(mapStateToProps);
export default connector(AddBeacon);

const styles = StyleSheet.create({
  list: {
    paddingTop: 16,
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingHorizontal: 16,
  },
});
