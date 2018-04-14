// @flow
import React, { Component } from 'react';
import { ListView, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import type { ReduxState } from '../reducers';
import RoomCell from './RoomCell';

const testdata = require('../../docs/data.json'); // eslint-disable-line import/no-commonjs

function mapStateToProps(state: ReduxState) {
  return {
    data: state.data,
  };
}

type Props = {
  listData: Object,
};

class RoomList extends Component {
  props: Props;
  state: {
    dataSource: ListView.DataSource,
  };

  constructor(props: Props) {
    super(props);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
      dataSource: ds.cloneWithRows(testdata.rooms),
    };
  }

  render() {
    return (
      <View style={styles.roomList}>
        <ListView dataSource={this.state.dataSource} renderRow={this.renderRow} />
      </View>
    );
  }

  renderRow = (rowData, _sectionID, _rowID) => {
    return <RoomCell rowData={rowData} onRowPressed={this.handleRoomCellPressed} />;
  };

  handleRoomCellPressed = () => {
    //
  };
}

export default connect(mapStateToProps)(RoomList);

const styles = StyleSheet.create({
  roomList: {
    paddingTop: 16,
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingHorizontal: 16,
  },
});
