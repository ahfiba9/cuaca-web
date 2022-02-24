import React from 'react'
import logo from './logo.svg'
import './App.css'
import { persistor, store } from 'src/App/store'
import { Provider } from 'react-redux'
import { Map } from 'src/MainMap/Map'
import { PersistGate } from 'redux-persist/integration/react'

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <h1>Hello Mate</h1>
          <div>
            <Map />
          </div>
        </div>
      </PersistGate>
    </Provider>
  )
}

export default App
