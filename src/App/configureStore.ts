import { applyMiddleware, compose, createStore, Reducer } from 'redux'
import thunk from 'redux-thunk'
import {GlobalState} from "src/Redux";
import {setGlobalStore} from "src/Redux/store";
import {rootReducer} from "src/Redux/reducers";
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

declare const window: any

let composeEnhancers = compose

if (typeof window !== 'undefined') {
  /**
   * If you need to trace, uncomment below and comment out the furthest one.
   */
  // composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
  //   trace: true
  // }) || compose

  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
}

export default () => {
  const store = createStore(
      persistedReducer as any as Reducer<GlobalState, any>,
      composeEnhancers(applyMiddleware(thunk))
  )

  const persistor = persistStore(store)

  setGlobalStore(store)

  return { store, persistor }
}
