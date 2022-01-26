import React from 'react'
import logo from './logo.svg'
import './App.css'
import { store } from 'src/App/store'
import { Provider } from 'react-redux'
import { Map } from 'src/MainMap/Map'

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Hello Mate</h1>
        <div>
          <Map />
        </div>
      </div>
    </Provider>
  )
}

export default App
