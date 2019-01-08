// @flow
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';

import { notifyPersistorBootstrapped } from '../utils/persist';
import { makeRootReducer } from '../reducers';
import rootSaga from '../sagas';

export default function configureStore(initialState: Object) {
  const sagaMiddleware = createSagaMiddleware();

  // eslint-disable-next-line no-underscore-dangle
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  // autoRehydrate automatically merges restored state (redux-persist).
  const storeEnhancer = composeEnhancers(applyMiddleware(sagaMiddleware));

  // $FlowFixMe
  const store = createStore(makeRootReducer(), initialState, storeEnhancer);
  sagaMiddleware.run(rootSaga, store.dispatch);

  // Persist store using redux-persist.
  const persistor = persistStore(store);
  // persistor.purge(); // purge all data
  notifyPersistorBootstrapped(persistor, store.dispatch);

  // Hot reload reducers
  const hot = (module: any).hot;
  if (hot) {
    hot.accept(() => {
      // eslint-disable-next-line no-console
      console.info('[HMR] Replacing reducers');

      // eslint-disable-next-line global-require
      store.replaceReducer(require('../reducers').makeRootReducer());
    });
  }

  return { store, persistor };
}
