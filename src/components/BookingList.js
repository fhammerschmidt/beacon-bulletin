// @flow
import * as React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { connect, type Connector } from 'react-redux';

import type { Booking } from '../../apiTypes';
import type { ReduxState } from '../reducers';
import type { BookingData } from '../reducers/temp';
import BookingCell from './BookingCell';

type OwnProps = {
  navigation: any,
};

type StoreProps = {
  data: BookingData,
};

type Props = OwnProps & StoreProps;

function mapStateToProps(state: ReduxState): StoreProps {
  return {
    data: state.temp.bookings,
  };
}

class BookingList extends React.Component<Props> {
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
    return <BookingCell key={rowData.item.id} room={rowData.item} onRowPressed={this.handleRoomCellPressed} />;
  };

  handleRoomCellPressed = (bookingId: string) => {
    this.props.navigation.navigate('BookingDetail', {
      bookingId,
    });
  };

  keyExtractor = (item: Booking, index: number) => index.toString();
}

const connector: Connector<OwnProps, Props> = connect(mapStateToProps);
export default connector(BookingList);

const styles = StyleSheet.create({
  list: {
    paddingTop: 16,
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingHorizontal: 16,
  },
});