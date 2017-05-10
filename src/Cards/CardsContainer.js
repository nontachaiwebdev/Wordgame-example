import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { array, func, string } from 'prop-types'
import Cards from './Cards'
import * as cardsActions from './reducer'

const propTypes = {
  word: string.isRequired,
  cards: array.isRequired,
  initCards: func.isRequired,
  checkResult: func.isRequired,
  moveCard: func.isRequired,
  startDrag: func.isRequired,
}

const mapStateToProps = state => ({
  cards: state.cards,
})

const mapDispatchToProps = dispatch => (
  bindActionCreators(cardsActions, dispatch)
)

class CardsContainer extends React.Component {
  componentDidMount() {
    const { word, initCards } = this.props
    initCards(word)
  }

  render() {
    return (
      <div>
        <Cards {...this.props} />
      </div>
    )
  }
}

CardsContainer.propTypes = propTypes

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardsContainer)
