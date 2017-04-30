import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import AppContainer from './container'
import cardReducer from './reducer'

const store = createStore(cardReducer);

class App extends Component {
 
  render() {
    return (
      <Provider store={store} >
        <AppContainer />  
      </Provider>
    );
  }
}

export default App;
