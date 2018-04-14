// @flow
import type { AppAction } from './app';
import type { DataAction } from './data';

export type Action = AppAction | DataAction;

export type Dispatch = (action: Action) => void;

export * from './app';
export * from './data';
