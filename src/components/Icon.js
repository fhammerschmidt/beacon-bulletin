// @flow
import { createIconSet } from 'react-native-vector-icons';

// eslint-disable-next-line import/no-commonjs
const glyphMap = require('./glyphmap.json');

const Icon = createIconSet(glyphMap, 'beacon_bulletin_font');

export default Icon;
