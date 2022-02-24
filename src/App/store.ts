import configureStore from './configureStore'

export const storeSettings = configureStore()
export const store = storeSettings.store
export const persistor = storeSettings.persistor
