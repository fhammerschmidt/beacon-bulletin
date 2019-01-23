// @flow
import * as React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { connect, type Connector } from 'react-redux';
import { type BeaconRegion } from '@nois/react-native-beacons-manager';

import type { Room } from '../../apiTypes';
import { fetchBookings, type DispatchProps } from '../actions';
import type { ReduxState } from '../reducers';
import type { RoomData, BeaconData } from '../reducers/data';
import RoomCell from './RoomCell';
import RoomDetail from './RoomDetail';

type OwnProps = {
  navigation: any,
  beacons?: BeaconRegion[],
};

type StoreProps = {
  rooms: RoomData,
  dataBeacons: BeaconData,
};

type Props = OwnProps & StoreProps & DispatchProps;

function mapStateToProps(state: ReduxState): StoreProps {
  return {
    rooms: state.data.rooms,
    dataBeacons: state.data.beacons,
  };
}

class RoomList extends React.Component<Props> {
  render() {
    const { rooms, dataBeacons, beacons } = this.props;
    if (beacons) {
      if (beacons.length > 0) {
        const found = dataBeacons.ids
          .map(beaconId => dataBeacons.byId[beaconId])
          .filter(b => {
            return b.minor === beacons[0].minor.toString();
          });
        if (found.length > 0) {
          // Use the first room in the sorted list to display prominently.
          const room = rooms.ids.map(roomId => rooms.byId[roomId]).filter(r => r.name === found[0].assignedRooms[0])[0];

          return (
            <View style={styles.list}>
              <RoomDetail room={room} bookings={[]} getBookings={this.getBookings} />
              <FlatList
                data={rooms.ids.map(id => rooms.byId[id])}
                renderItem={this.renderRow}
                keyExtractor={this.keyExtractor}
              />
            </View>
          );
        }
      }
    }
    return null;
  }

  renderRow = rowData => {
    return <RoomCell key={rowData.item.id} room={rowData.item} onRowPressed={this.handleRoomCellPressed} />;
  };

  handleRoomCellPressed = (roomId: string) => {
    this.props.navigation.navigate('RoomDetail', {
      roomId,
    });
  };

  getBookings = (roomId: string) => {
    this.props.dispatch(fetchBookings(roomId));
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
