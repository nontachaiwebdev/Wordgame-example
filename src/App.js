import React from 'react'
import { Provider } from 'react-redux'
import Cards from './Cards'
import store from './store'
import './css/App.css'

const App = () => (
  <Provider store={store}>
    <Cards word="father" />
  </Provider>
)

export default App
