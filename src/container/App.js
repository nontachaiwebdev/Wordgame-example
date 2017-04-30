import React, { Component } from 'react';
import update from 'react/lib/update';
import { createStore } from 'redux';
import { Provider } from 'react-redux'; 
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Card from './../Card';
import cardReducer from './../reducer' 

const store = createStore(cardReducer);

class App extends Component {
  constructor(props) {
    super(props);
    this.startDrag = this.startDrag.bind(this)
    this.moveCard = this.moveCard.bind(this)
    this.checkResult = this.checkResult.bind(this)
  }

  startDrag(index){
    this.props.start(index)
  }

  moveCard(dragIndex, hoverIndex) {
    this.props.move(dragIndex, hoverIndex)
  }

  checkResult() {
    this.props.checkresult()
  }

  render() {
    const { cards } = this.props;
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

const MainApp = DragDropContext(HTML5Backend)(App)

export default MainApp
