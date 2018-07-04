// @flow
import * as React from 'react';
import { Text, StyleSheet, View } from 'react-native';

import { COLORS } from '../constants';
import Icon from './Icon';

type Props = {
  icon?: string,
  message: string,
};

export default function UserInfoView({ message, icon }: Props) {
  return (
    <View style={styles.container}>
      {icon && <Icon name={icon} size={40} color={COLORS.BLUETOOTH} />}
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  text: {
    paddingTop: 16,
    fontSize: 24,
    textAlign: 'center',
    color: COLORS.GREY_TEXT,
  },
});
