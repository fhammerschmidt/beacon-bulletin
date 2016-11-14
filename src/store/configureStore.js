// @flow
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, autoRehydrate } from 'redux-persist';

import rootReducer from '../reducers';
// import rootSaga from '../sagas';
import storeConfig from './storeConfig';

export default function configureStore(initialState: ?Object) {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [ sagaMiddleware ];

  // eslint-disable-next-line no-underscore-dangle
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  // autoRehydrate automatically merges restored state (redux-persist).
  const storeEnhancer = composeEnhancers(applyMiddleware(...middlewares), autoRehydrate());

  const store = createStore(rootReducer, initialState, storeEnhancer);
  // Pass store.dispatch function down to fileUpload saga, so that we can dispatch actions in the progres event listener
  // sagaMiddleware.run(rootSaga, store.dispatch);

  // Persist store using redux-persist.
  // Append .purgeAll(); to purge store or e.g. .purge([ 'masterData' ]); to purge master data only.
  persistStore(store, storeConfig.persist);

  // Hot reload reducers
  const hot = (module: any).hot;
  if (hot) {
    hot.accept(() => {
      console.info('[HMR] Replacing reducers'); // eslint-disable-line no-console
      store.replaceReducer(require('../reducers').default); // eslint-disable-line global-require
    });
  }

  return store;
}
