import { applyMiddleware, compose, createStore, Reducer } from 'redux'
import thunk from 'redux-thunk'
import {GlobalState} from "src/Redux";
import {setGlobalStore} from "src/Redux/store";


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
    composeEnhancers(applyMiddleware(thunk))
  )

  setGlobalStore(store)

  return { store }
}
