import {DispatchType} from "src/Redux";
import {LocationResult} from "src/MainMap/api";

interface Params {
    type: string
    payload: {
        stateLocationsById: Record<string, LocationResult>
    }
}

const SET_STATE_LOCATION_BY_ID = 'SET_STATE_LOCATION_BY_ID'
// const SET_REDIRECT_FROM = 'SET_REDIRECT_FROM'
// const RESET_REDIRECT_FROM = 'RESET_REDIRECT_FROM'
//
// const SET_SHOW_ADDRESS_MODAL = 'SET_SHOW_ADDRESS_MODAL'
// const SET_USER_IN_SUBSCRIBED_STORE = 'SET_USER_IN_SUBSCRIBED_STORE'
// const SET_USER_AS_ACTIVE_SUBSCRIBER = 'SET_USER_AS_ACTIVE_SUBSCRIBER'

// actions
// export const setSelectedAddressAction = (payload: {
//     selectedAddressId?: number
// }) => (dispatch: DispatchType) =>
//     dispatch({ type: SET_SUBSCRIPTION_ADDRESS, payload })
//
// export const setRedirectFromAction = (payload: {
//     redirectFrom?: RedirectFromLocationType
// }) => (dispatch: DispatchType) => dispatch({ type: SET_REDIRECT_FROM, payload })
//
// export const resetRedirectFromAction = () => (dispatch: DispatchType) =>
//     dispatch({ type: RESET_REDIRECT_FROM })
//
// export const setShowSubscriptionAddressModal = (payload: {
//     showAddressModal: boolean
// }) => (dispatch: DispatchType) =>
//     dispatch({ type: SET_SHOW_ADDRESS_MODAL, payload })
//
// export const setSubscriptionStatus = (payload: {
//     isSubscriptionActiveInStore: boolean
// }) => (dispatch: DispatchType) =>
//     dispatch({ type: SET_USER_IN_SUBSCRIBED_STORE, payload })
//
export const setStateLocationsById = (payload: {
    stateLocationsById: Record<string, LocationResult>
}) =>
    ({ type: SET_STATE_LOCATION_BY_ID, payload })

export interface LocationForecastStates {
    stateLocationsById: Record<string, LocationResult> | undefined
}

// reducer
const initialState: LocationForecastStates = {
    stateLocationsById: undefined
}

export const locationForecastStatesReducer = (
    state = initialState,
    action: Params
) => {
    const { type, payload } = action
    switch (type) {
        case SET_STATE_LOCATION_BY_ID:
            console.log('payload = ', payload)
            console.log('state = ', state)
            return {
                ...state,
                stateLocationsById: payload.stateLocationsById
            }
        default:
            return state
    }
}
