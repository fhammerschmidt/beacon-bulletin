// @flow
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';

import rootReducer from '../reducers';

import rootSaga from '../sagas';
import { notifyPersistorBootstrapped } from '../utils/persist';

export default function configureStore(initialState: Object) {
  const sagaMiddleware = createSagaMiddleware();

  // eslint-disable-next-line no-underscore-dangle
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  // autoRehydrate automatically merges restored state (redux-persist).
  const storeEnhancer = composeEnhancers(applyMiddleware(sagaMiddleware));

  // $FlowFixMe
  const store = createStore(rootReducer, initialState, storeEnhancer);
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
      store.replaceReducer(rootReducer);
    });
  }

  return { store, persistor };
}
