// @flow
import * as React from 'react';
import { Text, TouchableOpacity, StyleSheet, View, Dimensions } from 'react-native';

import type { Room, ApiBooking, Booking } from '../../common/apiTypes';
import { getDateString, zeropad } from '../../common/utils';
import { COLORS } from '../constants';
import { Button, IconButton } from './Button';
import BookingCell from './BookingCell';
import UserInfoView from './UserInfoView';

type Props = {
  room: Room,
  bookings: Booking[],
  timeslots: string[],
  onBackPress?: () => void,
  getBookings: (roomId: string, date?: string) => void,
  createBooking: (booking: ApiBooking) => void,
};

type State = {
  loading: boolean,
  selectedTimeslot: string,
  day: string,
};

const screenWidth = Dimensions.get('window').width;

const selectTimeslot = (timeslot: string, firstTimeslot: string, selectedTimeslot: string) =>
  selectedTimeslot.length > 0 ? timeslot === selectedTimeslot : timeslot === firstTimeslot;

export default class RoomDetail extends React.Component<Props, State> {
  state = {
    loading: true,
    selectedTimeslot: '',
    day: getDateString(new Date()),
  };

  componentDidMount() {
    const { room, getBookings } = this.props;
    getBookings(room.id);
    this.handleToggleLoadingState();
  }

  componentDidUpdate(prevProps: Props) {
    const { room, getBookings } = this.props;

    if (room !== prevProps.room) {
      this.handleToggleLoadingState();
      getBookings(room.id);
      this.handleToggleLoadingState();
    }
  }

  render() {
    const {
      room: { name },
      bookings,
      onBackPress,
      timeslots,
    } = this.props;

    if (this.state.loading) {
      return <UserInfoView message="Fetching timeslots and bookings..." icon="tune" />;
    }

    return (
      <View style={styles.container}>
        <DetailRow title="Room Name:" value={name} />
        <DetailRow title={`Available Times for: ${this.state.day}`} />
        <View style={styles.timeslots}>
          {timeslots.length > 0 ? (
            timeslots.map((timeslot, i) => (
              <TimeslotCell
                key={i}
                timeslot={timeslot}
                selected={selectTimeslot(timeslot, timeslots[0], this.state.selectedTimeslot)}
                onPress={this.handleSelectTimeslot}
              />
            ))
          ) : (
            <TouchableRow
              text="No available slots. Check slots for tomorrow?"
              onPress={this.handleFetchTimeslotsPress}
            />
          )}
        </View>
        <DetailRow title="Most recent booking:" />
        {bookings.length > 0 && <BookingCell booking={bookings[bookings.length - 1]} />}

        {onBackPress && <IconButton onPress={this.handleBackPressed} iconName="view_headline" label="Go back" />}
        <Button onPress={this.handleBookRoomPressed} label="Book Room now" />
      </View>
    );
  }

  handleBackPressed = () => {
    const { onBackPress } = this.props;
    if (onBackPress) {
      onBackPress();
    }
  };

  handleBookRoomPressed = () => {
    const { room, timeslots, createBooking } = this.props;
    const { selectedTimeslot, day } = this.state;
    const booking = {
      day,
      start: selectedTimeslot.length > 0 ? selectedTimeslot : timeslots[0],
      duration: 30,
      roomId: room.id,
    };
    createBooking(booking);
  };

  handleToggleLoadingState = () => {
    this.setState(state => {
      return { loading: !state.loading };
    });
  };

  handleSelectTimeslot = (selectedTimeslot: string) => {
    this.setState({ selectedTimeslot });
  };

  handleFetchTimeslotsPress = () => {
    const { room, getBookings } = this.props;
    const newDate = new Date(this.state.day);
    const day = `${newDate.getFullYear()}-${zeropad(newDate.getMonth() + 1)}-${zeropad(newDate.getDate() + 1)}`;

    this.setState({ day });
    getBookings(room.id, day);
  };

  renderItem = ({ item }: { item: Booking }) => {
    return <BookingCell key={item.id} booking={item} />;
  };

  keyExtractor = (item: Booking, index: number) => index.toString();
}

function DetailRow({ title, value }: { title: string, value?: string }) {
  return (
    <View style={styles.detail}>
      <Text style={styles.title}>{title}</Text>
      {value && <Text style={styles.value}>{value}</Text>}
    </View>
  );
}

function TouchableRow({ text, onPress }: { text: string, onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.detail}>
        <Text style={styles.touchableText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

class TimeslotCell extends React.Component<{
  timeslot: string,
  selected: boolean,
  onPress: (timeslot: string) => void,
}> {
  render() {
    const { timeslot, selected } = this.props;
    return (
      <TouchableOpacity onPress={this.handlePressed}>
        <View style={[styles.timeslot, selected ? styles.selected : {}]}>
          <Text style={selected ? styles.selectedTitle : styles.title}>{timeslot}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  handlePressed = () => {
    const { timeslot, onPress } = this.props;
    onPress(timeslot);
  };
}

const styles = StyleSheet.create({
  container: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'black',
    padding: 8,
    marginBottom: 8,
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  timeslots: {
    flexDirection: 'row',
    alignItems: 'stretch',
    flexWrap: 'wrap',
    marginBottom: 12,
    marginHorizontal: -2,
  },
  timeslot: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'black',
    borderRadius: 5,
    width: (screenWidth - 66) / 5,
    minWidth: 50,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    marginHorizontal: 2,
  },
  selected: {
    backgroundColor: COLORS.PRIMARY,
  },
  title: {},
  touchableText: {
    color: COLORS.PRIMARY,
  },
  selectedTitle: {
    color: 'white',
  },
  value: {
    textAlign: 'right',
    flex: 1,
    fontWeight: 'bold',
  },
});
