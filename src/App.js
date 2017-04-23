import React, { Component } from 'react';
import update from 'react/lib/update';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Card from './Card';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.moveCard = this.moveCard.bind(this);
    this.state = {
      cards : [{
        id: 1,
	word: 'F'
      }, {
	id: 2,
 	word: 'A'
      }, {
	id: 3,
	word: 'M'
      }, {
	id: 4,
	word: 'I'
      }, {
	id: 5,
	word: 'L'
      }, {
	id: 6,
	word: 'Y'
      }]
    }
  }
  moveCard(dragIndex, hoverIndex) {
    const { cards } = this.state;
    const dragCard = cards[dragIndex];

    this.setState(update(this.state, {
      cards : {
        $splice: [
	  [dragIndex, 1],
	  [hoverIndex, 0 , dragCard]
	]
      }
    }));
  }
  render() {
    const { cards } = this.state; 
    return (
      <div className="App">
        {cards.map((card, i)=> (
	  <Card
	    key={card.id}
	    index={i}
	    id={card.id}
	    text={card.word}
	    moveCard={this.moveCard}
	  />
	))}
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
