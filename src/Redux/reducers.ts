import { AnyAction, combineReducers } from 'redux'
import {GlobalState} from "src/Redux/index";
import {locationForecastStatesReducer} from "src/MainMap/redux/locationStates";


export const reducers = combineReducers({
  locationForecastState: locationForecastStatesReducer
} as any)

export const rootReducer = (state: GlobalState, action: AnyAction) => {
  if (action.type === 'RESET_WEB') {
    // const { device, area } = state
    //
    // state = { area, device } as GlobalState
  }

  if (action.type === 'RESET_WEB_FULLY') {
    state = {} as GlobalState
  }

  return (reducers as any)(state as any, action)
}
