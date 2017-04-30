import { connect } from 'react-redux'
import MainApp from './App.js' 
import { currentCards, moveCard, checkResult } from './../action'

const mapStateToProps = (state, ownProps) => {
  console.log(`Update`)
  console.log(state)
  return { cards: state.cards }   
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  start: (index) => {
    dispatch(currentCards(index));
  },
  move: (index, hoverindex) => {
    dispatch(moveCard(index, hoverindex));
  },
  checkresult: () => {
    dispatch(checkResult());
  }
})

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainApp)

export default AppContainer
