// @flow
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PRIMARY_APP_COLOR } from '../constants';
import BeaconBulletinIcons from './BeaconBulletinIcons';

type Props = {
  route: Object,
  index: number,
  onPress: (index: number) => void,
};

export default class MenuRow extends React.Component<Props> {
  render() {
    const { title, icon } = this.props.route;

    return (
      <TouchableOpacity onPress={this.handlePress}>
        <View style={styles.menuRow}>
          {icon && <BeaconBulletinIcons name={icon} size={24} color="white" />}
          <Text style={styles.menuRowText}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  handlePress = () => {
    const { index } = this.props;
    this.props.onPress(index);
  };
}

const styles = StyleSheet.create({
  menuRow: {
    flex: 1,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: PRIMARY_APP_COLOR,
    paddingHorizontal: 16,
  },
  menuRowText: {
    color: 'white',
    marginHorizontal: 16,
  },
});
