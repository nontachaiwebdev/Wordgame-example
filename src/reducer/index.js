import update from 'react/lib/update';
const initCardsData = {
  cards: [{
           id: 1,
           word: 'A',
           checker: false
          }, {
            id: 2,
            word: 'Y',
            checker: false
          }, {
            id: 3,
            word: 'I',
            checker: false
          }, {
            id: 4,
            word: 'L',
            checker: false
          }, {
            id: 5,
            word: 'M',
            checker: false
          }, {
            id: 6,
            word: 'F',
            checker: false
  }],
  cloneCards: [],
  focusIndex: 0,
  hoverIndex: 0,
  result: ['F','A','M','I','L','Y']
}


const cardReducer = (state = initCardsData, action) => {
  switch(action.type){
    case 'CURRENTCARDS':
      return Object.assign({}, state, { focusIndex: action.focusIndex, hoverIndex: action.focusIndex, cloneCards: state.cards  });
    case 'MOVECARD':
      if(action.hoverindex !== state.hoverIndex){
	const data = swapElementArray(state.cloneCards, action.index, action.hoverindex)
	return Object.assign({}, state, {hoverIndex: action.hoverindex, cards: data});
      }
      else{
        return state
      }
    case 'CHECKRESULT':
      let word = ''
      let newObject = null
      let cardData = new Array(0)
      state.cards.map((item, i) => {
        if( item.word === state.result[i] ) {
	  const updateObject = update(state.cards[i],{checker: {$set: true} });
	  cardData.push(updateObject)          
	} 
        else {
          const updateObject = update(state.cards[i],{checker: {$set: false} });
          cardData.push(updateObject)
	}
	word += item.word
	console.log('this Finish Point!!!')
      })
      return Object.assign({}, state, { cards: cardData })
    default: 
      return state
  }
}

function swapElementArray(arrayInput, a, b){
  const array = arrayInput.slice();
  const block = array[a];
  array[a] = array[b];
  array[b] = block;
  return array;
}



export default cardReducer
