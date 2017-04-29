import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import _ from 'lodash';
import { DragSource, DropTarget } from 'react-dnd';
import ItemType from './ItemType';
import './App.css';

const cardSource = {
  beginDrag(props){
    props.startDrag(props.index);
    return {
      id: props.id,
      index: props.index, 
    }
  },
  endDrag(props, monitor, component){
    props.checkResult();
  }
};

const cardTarget = {
  hover(props, monitor, component){
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    /* if(dragIndex === hoverIndex) {
      return;
    } */
    props.moveCard(dragIndex, hoverIndex);
    //monitor.getItem().index = hoverIndex;
  }
}

class Card extends Component {
  render() {
    const { checker } = this.props;
    const { isDragging, connectDragSource, connectDropTarget } = this.props;
    const correctStyle = checker ? { 'background' : "#2ecc71", "color" : "#fff"  } : {};
    return connectDragSource(connectDropTarget(
      <div className='card' style={ correctStyle } >
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
  checker: PropTypes.bool.isRequire,
  startDrag: PropTypes.func.isRequire
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
