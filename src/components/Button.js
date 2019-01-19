// @flow
import * as React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

import { COLORS } from '../constants';
import Icon from './Icon';

type ButtonProps = {
  onPress: () => void,
  label: string,
};

export function Button({ onPress, label }: ButtonProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}

type IconButtonProps = {
  onPress: () => void,
  iconName: string,
  label?: string,
};

export function IconButton({ onPress, iconName, label }: IconButtonProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.button, styles.iconButton]}>
        <Icon name={iconName} size={24} color="white" />
        {label && <Text style={[styles.buttonText, styles.iconButtonText]}>{label}</Text>}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'transparent',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 14,
    marginTop: 16,
    marginBottom: 8,
    backgroundColor: COLORS.PRIMARY,
  },
  iconButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  iconButtonText: {
    marginLeft: 8,
  },
});
