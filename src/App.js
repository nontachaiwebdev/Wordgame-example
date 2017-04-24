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
    this.checkResult = this.checkResult.bind(this);
    this.result = ['F','A','M','I','L','Y'];
    this.state = {
      cards : [{
        id: 1,
	word: 'F',
        checker: false
      }, {
	id: 2,
 	word: 'A',
	checker: false
      }, {
	id: 3,
	word: 'M',
	checker: false
      }, {
	id: 4,
	word: 'I',
	checker: false
      }, {
	id: 5,
	word: 'L',
	checker: false
      }, {
	id: 6,
	word: 'Y',
	checker: false
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

  checkResult() {
    let stringCard = '';
    this.state.cards.map((object, i) => {
      if( object.word === this.result[i] ) {
	const updateObject = update(this.state.cards[i],{checker: {$set: true} });
	console.log(updateObject);
	const newObject = update(this.state.cards, {
          $splice: [[i, 1, updateObject]]
    	});
	this.setState({cards: newObject});
      }
      else {
        const updateObject = update(this.state.cards[i],{checker: {$set: false} });
	console.log(updateObject);
	const newObject = update(this.state.cards, {
          $splice: [[i, 1, updateObject]]
    	});
	this.setState({cards: newObject});
      }
      stringCard += object.word;
    });
    if( stringCard === this.result.join("") )
    console.log('Finish');
  }

  render() {
    const { cards } = this.state; 
    return (
      <div className="App" ref='container' >
        {cards.map((card, i)=> (
	  <Card
	    key={card.id}
	    index={i}
	    id={card.id}
	    text={card.word}
	    moveCard={this.moveCard}
	    checkResult={this.checkResult}
	    checker={card.checker}
	  />
	))}
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
