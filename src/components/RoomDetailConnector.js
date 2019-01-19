// @flow
import * as React from 'react';
import { connect, type Connector } from 'react-redux';
import isNil from 'lodash/isNil';

import type { Room } from '../../apiTypes';
import type { ReduxState } from '../reducers';
import { roomSelector } from '../reducers/data';
import RoomDetail from './RoomDetail';

type OwnProps = {
  roomId: string, // eslint-disable-line react/no-unused-prop-types
  onBackPress?: () => void,
};

type StoreProps = {
  room: Room,
};

type Props = OwnProps & StoreProps;

function mapStateToProps(state: ReduxState, ownProps: OwnProps): StoreProps {
  const { roomId } = ownProps;
  return {
    room: roomSelector(state, roomId),
  };
}

class RoomDetailConnector extends React.Component<Props> {
  render() {
    const { room, onBackPress } = this.props;
    if (isNil(room)) {
      return null;
    }
    return <RoomDetail room={room} onBackPress={onBackPress} />;
  }
}

const connector: Connector<OwnProps, Props> = connect(mapStateToProps);
export default connector(RoomDetailConnector);
