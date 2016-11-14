// @flow
import React from 'react';
import { Text } from 'react-native';

export default function Icon(props: { type: string, style: number }) {
  switch (props.type) {
    case 'room':
      return <Text style={props.style}>#</Text>;
    case 'beacon':
      return <Text style={props.style}>#</Text>;
    default:
      return <Text style={props.style}>...</Text>;
  }
}
