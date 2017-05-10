import React from 'react'
import { array, func } from 'prop-types'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Card from './Card'

const propTypes = {
  cards: array.isRequired,
  dragCard: func.isRequired,
  moveCard: func.isRequired,
  checkResult: func.isRequired,
}

const Cards = ({ cards, dragCard, checkResult, moveCard }) => (
  <div className="Cards">
    {cards.map((card, i) => (
      <Card
        key={card.id}
        index={i}
        id={card.id}
        text={card.letter}
        moveCard={moveCard}
        checkResult={checkResult}
        correct={card.correct}
        startDrag={dragCard}
      />
    ))}
  </div>
)

Cards.propTypes = propTypes
export default DragDropContext(HTML5Backend)(Cards)
