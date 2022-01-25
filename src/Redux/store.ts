import { Store } from 'redux'
import { GlobalState } from './index'

interface GlobalStoreStorage {
  store: Store<GlobalState>
}

const globalStore: GlobalStoreStorage = {
  store: null as any
}

export const setGlobalStore = (store: any) => {
  globalStore.store = store
}

export const getGlobalStore = (): Store<GlobalState, any> => {
  return globalStore.store
}
