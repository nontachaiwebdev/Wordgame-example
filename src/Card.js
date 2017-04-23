import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import _ from 'lodash';
import { DragSource, DropTarget } from 'react-dnd';
import ItemType from './ItemType';
import './App.css';

const cardSource = {
  beginDrag(props){
    return {
      id: props.id,
      index: props.index
    }
  }
};

const cardTarget = {
  hover(props, monitor, component){
    //console.log(props);
    //console.log(monitor);
    //console.log(component);
    const dragIndex = monitor.getItem().index;
    console.log('DragIndex');
    console.log(dragIndex);
    const hoverIndex = props.index;
    console.log('HoverIndex');
    console.log(hoverIndex);
    if(dragIndex === hoverIndex) {
      return;
    }
    /* const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
    const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
    console.log('hoverMiddleX');
    console.log(hoverMiddleX);
    const clientOffset = monitor.getClientOffset();
    const hoverClientX = clientOffset.x - hoverBoundingRect.right;
    console.log('hoverClientX');
    console.log(hoverClientX); */
    props.moveCard(dragIndex, hoverIndex);
    monitor.getItem().index = hoverIndex;
  }
}

class Card extends Component {
    render() {
    const { isDragging, connectDragSource, connectDropTarget } = this.props;
    return connectDragSource(connectDropTarget(
      <div className='card'>
        { this.props.text }
      </div>
    ));
  }
}

Card.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  isDragging: PropTypes.bool.isRequired,
  id: PropTypes.any.isRequired,
  text: PropTypes.string.isRequired,
}

function collect1(connect, monitor){
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
}
function collect2(connect){
  return {
    connectDropTarget: connect.dropTarget(),
  }
}

let highLevelComponent;
highLevelComponent = _.flow(
  DropTarget(ItemType.CARD, cardTarget, collect2),
  DragSource(ItemType.CARD, cardSource, collect1)
)(Card);

export default highLevelComponent;
