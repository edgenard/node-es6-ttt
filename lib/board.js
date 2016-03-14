export const board = (state=[0, 1, 2, 3, 4, 5, 6, 7, 8]) => { return state }

export const placeMark = (options = {}) => {
  let {currentBoard, position, mark} = options
  if (typeof currentBoard[position] === "number") currentBoard[position] = mark

  return board(currentBoard)

}
