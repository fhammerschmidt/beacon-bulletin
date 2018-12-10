// @flow
import type { Dispatch } from 'redux'; // eslint-disable-line import/named

export type PersistBootStrappedAction = { type: 'PERSIST_BOOTSTRAPPED' };

// Util function for redux-persist 5 to dispatch an action
// when persistence has finished the bootstrap process
// (i.e. all rehydrates are done).
export function notifyPersistorBootstrapped(persistor: Object, dispatch: Dispatch<PersistBootStrappedAction>) {
  const unsubscribe = persistor.subscribe(handlePersistorState);
  handlePersistorState();

  function handlePersistorState() {
    const persistorState = persistor.getState();

    if (persistorState.bootstrapped) {
      unsubscribe();
      dispatch({ type: 'PERSIST_BOOTSTRAPPED' });
    }
  }
}
