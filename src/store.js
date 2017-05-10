import { createStore } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import { reducer as cards } from './Cards'

const store = createStore(
  cards,
  devToolsEnhancer(),
)

export default store
