// @flow
import * as React from 'react';
import { connect, type Connector } from 'react-redux';
import isNil from 'lodash/isNil';

import type { Room, Booking, ApiBooking } from '../../apiTypes';
import { fetchBookings, fetchTimeslots, postBooking, type DispatchProps } from '../actions';
import type { ReduxState } from '../reducers';
import { roomSelector } from '../reducers/data';
import { bookingsForRoomSelector, timeslotsForRoomSelector } from '../reducers/temp';
import RoomDetail from './RoomDetail';

type OwnProps = {
  roomId: string, // eslint-disable-line react/no-unused-prop-types
  onBackPress?: () => void,
};

type StoreProps = {
  room: Room,
  bookings: Booking[],
  timeslots: string[],
};

type Props = OwnProps & StoreProps & DispatchProps;

function mapStateToProps(state: ReduxState, ownProps: OwnProps): StoreProps {
  const { roomId } = ownProps;
  return {
    room: roomSelector(state, roomId),
    bookings: bookingsForRoomSelector(state, roomId),
    timeslots: timeslotsForRoomSelector(state, roomId),
  };
}

class RoomDetailConnector extends React.Component<Props> {
  render() {
    const { room, onBackPress, bookings, timeslots } = this.props;
    if (isNil(room)) {
      return null;
    }
    return (
      <RoomDetail
        room={room}
        bookings={bookings}
        timeslots={timeslots}
        onBackPress={onBackPress}
        getBookings={this.getBookings}
        createBooking={this.createBooking}
      />
    );
  }

  getBookings = (roomId: string) => {
    this.props.dispatch(fetchBookings(roomId));
    this.props.dispatch(fetchTimeslots(roomId));
  };

  createBooking = (booking: ApiBooking) => {
    this.props.dispatch(postBooking(booking));
  };
}

const connector: Connector<OwnProps, Props> = connect(mapStateToProps);
export default connector(RoomDetailConnector);
