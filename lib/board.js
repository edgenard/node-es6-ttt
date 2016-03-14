export const board = (state=[0, 1, 2, 3, 4, 5, 6, 7, 8]) => { return state }

export const placeMark = ( {currentBoard, position, mark}) => {
  if (typeof currentBoard[position] === "number") currentBoard[position] = mark

  return board(currentBoard)
}

export const checkRows = (board) => {
  let row = board.filter((item, index) => index < 3 )
  let mark = row[0]
  if (row.every((item) => item === mark)) return mark

  row = board.filter((item, index) => index >= 3 && index < 6)
  mark = row[0]
  if (row.every((item) => item === mark)) return mark

  row = board.filter((item, index) => index >= 6 )
  mark = row[0]
  if (row.every((item) => item === mark)) return mark

  return false
}
