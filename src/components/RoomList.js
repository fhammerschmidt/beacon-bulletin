// @flow
import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';

import type { ReduxState } from '../reducers';
import RoomCell from './RoomCell';

const testdata = require('../../docs/data.json'); // eslint-disable-line import/no-commonjs

function mapStateToProps(state: ReduxState) {
  return {
    roomData: state.roomData,
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

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows(testdata.rooms),
    };
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
      />
    );
  }

  renderRow = (rowData, _sectionID, _rowID) => {
    return (
      <RoomCell
        rowData={rowData}
        onRowPressed={this.handleRoomCellPressed}/>
    );
  };

  handleRoomCellPressed = () => {
    //
  };
}

export default connect(mapStateToProps)(RoomList);
