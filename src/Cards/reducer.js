import shuffle from 'lodash/shuffle'

const INIT_CARDS = 'Cards/INIT'
const DRAG_CARD = 'Cards/DRAG'
const MOVE_CARD = 'Cards/MOVE'
const CHECK_RESULT = 'Cards/CHECK_RESULT'

const swapElementArray = (arrayInput, a, b) => {
  const array = arrayInput.slice()
  const block = array[a]
  array[a] = array[b]
  array[b] = block
  return array
}

const initialState = {
  cards: [],
  cloneCards: [],
  focusIndex: 0,
  hoverindex: 0,
  word: '',
}

const createCards = word => (
  shuffle(word.split('')).map((letter, id) => ({
    id,
    letter,
    correct: false,
  }))
)

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case INIT_CARDS: {
      const { word } = payload
      const cards = createCards(word)
      return {
        ...initialState,
        word,
        cards,
      }
    }

    case DRAG_CARD: {
      const { focusIndex } = payload
      return {
        ...state,
        focusIndex,
        hoverIndex: focusIndex,
        cloneCards: state.cards,
      }
    }

    case MOVE_CARD: {
      const { index, hoverIndex } = payload
      if (hoverIndex !== state.hoverIndex) {
        const cards = swapElementArray(
          state.cloneCards,
          index,
          hoverIndex,
        )
        return {
          ...state,
          hoverIndex,
          cards,
        }
      }
      return state
    }

    case CHECK_RESULT: {
      const { word, cards } = state
      const correctLetters = word.split('')
      const newCards = cards.map((item, i) => ({
        ...item,
        correct: item.letter === correctLetters[i],
      }))
      return ({
        ...state,
        cards: newCards,
      })
    }

    default: {
      return state
    }
  }
}

const initCards = word => ({
  type: INIT_CARDS,
  payload: {
    word,
  },
})

const dragCard = focusIndex => ({
  type: DRAG_CARD,
  payload: {
    focusIndex,
  },
})

const moveCard = (index, hoverIndex) => ({
  type: MOVE_CARD,
  payload: {
    index,
    hoverIndex,
  },
})

const checkResult = () => ({
  type: CHECK_RESULT,
})

export {
  checkResult,
  dragCard,
  initCards,
  moveCard,
}

export default reducer
