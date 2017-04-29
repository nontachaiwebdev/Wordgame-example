import React, { Component } from 'react';
import update from 'react/lib/update';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Card from './Card';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.startDrag = this.startDrag.bind(this);
    this.moveCard = this.moveCard.bind(this);
    this.checkResult = this.checkResult.bind(this);
    this.nowHoverIndex = 0;
    this.result = ['F','A','M','I','L','Y'];
    this.cloneCards = []
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

  swapElementArray(arrayInput, a, b){
    const array = arrayInput.slice();
    const block = array[a];
    array[a] = array[b];
    array[b] = block;
    return array;
  }

  startDrag(index){
    this.nowHoverIndex = index
    this.cloneCards = this.state.cards
  }

  moveCard(dragIndex, hoverIndex) {
    if( hoverIndex != this.nowHoverIndex ){
      this.nowHoverIndex = hoverIndex
      this.setState({cards: this.swapElementArray(this.cloneCards, dragIndex, hoverIndex)});
    }
  }

  checkResult() {
    console.log(`End Drag`);
    let stringCard = '';
    this.cloneCards = this.state.cards;
    this.state.cards.map((object, i) => {
      if( object.word === this.result[i] ) {
	const updateObject = update(this.state.cards[i],{checker: {$set: true} });
	const newObject = update(this.state.cards, {
          $splice: [[i, 1, updateObject]]
    	});
	this.setState({cards: newObject});
      }
      else {
        const updateObject = update(this.state.cards[i],{checker: {$set: false} });

	const newObject = update(this.state.cards, {
          $splice: [[i, 1, updateObject]]
    	});
	this.setState({cards: newObject});
      }
      stringCard += object.word;
    });
    if( stringCard === this.result.join("") ){
    
    }
    this.cloneCards = this.state.cards
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
	    startDrag={this.startDrag}
	  />
	))}
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
