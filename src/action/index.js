export const currentCards = (index) => ({
  type: 'CURRENTCARDS',
  focusIndex: index
})

export const moveCard = (index, hoverindex) => ({
  type: 'MOVECARD',
  index: index,
  hoverindex: hoverindex
})

export const checkResult = () => ({
  type: 'CHECKRESULT'
})
