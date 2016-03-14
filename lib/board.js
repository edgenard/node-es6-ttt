export const board = (state=[0, 1, 2, 3, 4, 5, 6, 7, 8]) => { return state }

export const placeMark = ( {currentBoard, position, mark}) => {
  if (typeof currentBoard[position] === "number") currentBoard[position] = mark

  return board(currentBoard)

}
