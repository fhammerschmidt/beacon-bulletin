// @flow
import * as React from 'react';
import { FlatList, StyleSheet, ScrollView } from 'react-native';
import { connect, type Connector } from 'react-redux';
import { type BeaconRegion } from '@nois/react-native-beacons-manager';
import keyBy from 'lodash/keyBy';

import type { Beacon, Room } from '../../common/apiTypes';
import type { ReduxState } from '../reducers';
import { roomListSelector, beaconListSelector } from '../reducers/data';
import RoomCell from './RoomCell';
import RoomDetailConnector from './RoomDetailConnector';
import UserInfoView from './UserInfoView';

type OwnProps = {
  navigation: any,
  beacons?: BeaconRegion[],
  toggleBeaconUuid?: () => void,
};

type StoreProps = {
  rooms: Room[],
  dataBeacons: Beacon[],
};

type Props = OwnProps & StoreProps;

function mapStateToProps(state: ReduxState): StoreProps {
  return {
    rooms: roomListSelector(state),
    dataBeacons: beaconListSelector(state),
  };
}

class RoomList extends React.Component<Props> {
  render() {
    const { rooms, dataBeacons, beacons, toggleBeaconUuid } = this.props;
    if (beacons) {
      if (beacons.length > 0) {
        const beaconsById = keyBy(beacons, b => b.minor.toString());
        const found = dataBeacons
          .filter(db => beaconsById[db.minor])
          .map(db => {
            return { distance: beaconsById[db.minor].distance, ...db };
          });

        if (found.length > 0) {
          // Use the first room in the sorted list to display prominently.
          const foundById = keyBy(found, f => f.assignedRooms[0]);
          const availableRooms = rooms
            .filter(r => foundById[r.name])
            .map(r => {
              return { distance: foundById[r.name].distance, ...r };
            })
            .sort((a, b) => a.distance - b.distance);
          const [nearestRoom, ...rest] = availableRooms;

          return (
            <ScrollView style={styles.list}>
              <RoomDetailConnector roomId={nearestRoom.id} />
              <FlatList data={rest} renderItem={this.renderRow} keyExtractor={this.keyExtractor} />
            </ScrollView>
          );
        }
      }
    }
    return (
      <UserInfoView
        message="No beacon in range, check with a different uuid?"
        action={toggleBeaconUuid}
        actionLabel="Use other UUID"
      />
    );
  }

  renderRow = ({ item }: { item: Room }) => {
    return <RoomCell key={item.id} room={item} onRowPressed={this.handleRoomCellPressed} />;
  };

  handleRoomCellPressed = (room: Room) => {
    this.props.navigation.navigate('RoomDetail', {
      roomId: room.id,
    });
  };

  keyExtractor = (item: Room, index: number) => index.toString();
}

const connector: Connector<OwnProps, Props> = connect(mapStateToProps);
export default connector(RoomList);

const styles = StyleSheet.create({
  list: {
    paddingTop: 16,
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingHorizontal: 16,
  },
});
