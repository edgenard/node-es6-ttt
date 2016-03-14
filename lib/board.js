export const board = (state=[0, 1, 2, 3, 4, 5, 6, 7, 8]) => { return state }

export const placeMark = ( {currentBoard, position, mark}) => {
  if (typeof currentBoard[position] === "number") currentBoard[position] = mark

  return board(currentBoard)
}

export const checkRows = (board) => {
  const firstRow = board.filter((item, index) => index < 3 )
  const firstMark = firstRow[0]
  if (firstRow.every((item) => item === firstMark)) return firstMark
}
