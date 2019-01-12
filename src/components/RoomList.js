// @flow
import * as React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { connect, type Connector } from 'react-redux';

import type { Room } from '../../apiTypes';
import type { ReduxState } from '../reducers';
import type { RoomData } from '../reducers/data';
import RoomCell from './RoomCell';

type OwnProps = {
  navigation: any,
};

type StoreProps = {
  data: RoomData,
};

type Props = OwnProps & StoreProps;

function mapStateToProps(state: ReduxState): StoreProps {
  return {
    data: state.data.rooms,
  };
}

class RoomList extends React.Component<Props> {
  render() {
    const { data } = this.props;
    return (
      <View style={styles.list}>
        <FlatList
          data={data.ids.map(id => data.byId[id])}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
        />
      </View>
    );
  }

  renderRow = rowData => {
    return <RoomCell key={rowData.item.id} room={rowData.item} onRowPressed={this.handleRoomCellPressed} />;
  };

  handleRoomCellPressed = (roomId: string) => {
    this.props.navigation.navigate('RoomDetail', {
      roomId,
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
