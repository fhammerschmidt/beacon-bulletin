// @flow
import * as React from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import { connect, type Connector } from 'react-redux';

import type { Booking } from '../../common/apiTypes';
import type { ReduxState } from '../reducers';
import type { BookingMap } from '../reducers/temp';
import BookingCell from './BookingCell';

type OwnProps = {
  navigation: any,
};

type StoreProps = {
  data: BookingMap,
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
    const ids = Object.keys(data);
    return (
      <View style={styles.list}>
        <SectionList
          renderItem={this.renderRow}
          renderSectionHeader={this.renderSectionHeader}
          sections={ids.map(id => ({ title: id, data: data[id] }))}
          keyExtractor={this.keyExtractor}
        />
      </View>
    );
  }

  renderRow = ({ item, _index, _section }) => {
    return <BookingCell key={item.id} booking={item} onRowPressed={this.handleRoomCellPressed} />;
  };

  handleRoomCellPressed = (bookingId: string) => {
    this.props.navigation.navigate('BookingDetail', {
      bookingId,
    });
  };

  renderSectionHeader = ({ section: { title } }) => <Text style={{ fontWeight: 'bold' }}>{title}</Text>;

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
