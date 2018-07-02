// @flow
import * as React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { connect, type Connector } from 'react-redux';

import type { ReduxState } from '../reducers';
import type { DataState /*, Room */ } from '../reducers/data';
import RoomCell from './RoomCell';

const testdata = require('../../docs/data.json'); // eslint-disable-line import/no-commonjs

type OwnProps = {
  // listData: Room[],
};

type StoreProps = {
  data: DataState,
};

type Props = OwnProps & StoreProps;

function mapStateToProps(state: ReduxState): StoreProps {
  return {
    data: state.data,
  };
}

class RoomList extends React.Component<Props> {
  render() {
    // const { listData } = this.props;
    return (
      <View style={styles.roomList}>
        <FlatList data={testdata.rooms} renderItem={this.renderRow} />
      </View>
    );
  }

  renderRow = rowData => {
    return <RoomCell rowData={rowData} onRowPressed={this.handleRoomCellPressed} />;
  };

  handleRoomCellPressed = () => {
    //
  };
}

const connector: Connector<{}, Props> = connect(mapStateToProps);
export default connector(RoomList);

const styles = StyleSheet.create({
  roomList: {
    paddingTop: 16,
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingHorizontal: 16,
  },
});
