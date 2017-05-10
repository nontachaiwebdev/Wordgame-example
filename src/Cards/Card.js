import React from 'react'
import { bool, func, number, string } from 'prop-types'
import flow from 'lodash/flow'
import { DragSource, DropTarget } from 'react-dnd'
import { CARD } from './itemTypes'

const propTypes = {
  correct: bool.isRequired,
  connectDragSource: func.isRequired,
  connectDropTarget: func.isRequired,
  id: number.isRequired,
  index: number.isRequired,
  isDragging: bool.isRequired,
  startDrag: func.isRequire,
  text: string.isRequired,
}

const cardSource = {
  beginDrag(props) {
    props.startDrag(props.index)
    return {
      id: props.id,
      index: props.index,
    }
  },
  endDrag(props) {
    props.checkResult()
  },
}

const cardTarget = {
  hover(props, monitor) {
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index
    /* if(dragIndex === hoverIndex) {
       return;
       } */
    props.moveCard(dragIndex, hoverIndex)
    // monitor.getItem().index = hoverIndex;
  },
}

const Card = ({
  correct,
  connectDragSource,
  connectDropTarget,
  isDragging,
  text,
}) =>
  connectDragSource(
    connectDropTarget(
      <div
        className={`card ${isDragging && 'isDragging'} ${correct && 'correct'}`}
      >
        {text}
      </div>,
    ),
  )

Card.propTypes = propTypes

const collect1 = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
})

const collect2 = connect => ({
  connectDropTarget: connect.dropTarget(),
})

const highLevelComponent = flow(
  DropTarget(CARD, cardTarget, collect2),
  DragSource(CARD, cardSource, collect1),
)(Card)

export default highLevelComponent
