// @flow
import type { Dispatch as ReduxDispatch } from 'redux';
import type { AppAction } from './app';
import type { DataAction } from './data';

export type Action = AppAction | DataAction;

export type Dispatch = ReduxDispatch<Action>;
export type DispatchProps = { dispatch: Dispatch };

export * from './app';
export * from './data';
