const BoardMap = {
  0: [0, 0],
  1: [0, 1],
  2: [0, 2],
  3: [1, 0],
  4: [1, 1],
  5: [1, 2],
  6: [2, 0],
  7: [2, 1],
  8: [2, 2]
}

export const board = (state=[[0, 1, 2], [3, 4, 5], [6, 7, 8]]) =>  {
  const getPosition = (position) => {
    const[row, column] = BoardMap[position]
    return state[row][column]
  }
  const setPosition = (mark, position) => {
    const [row, column] = BoardMap[position]
    state[row][column] = mark
    return board(state)
  }
  return {
    state: state,
    getPosition: getPosition,
    setPosition: setPosition
  }
}
export const placeMark = ( {currentBoard, position, mark}) => {
  if (typeof currentBoard.getPosition(position) === "number") {
    return currentBoard.setPosition(mark, position)
  }else {
    return currentBoard
  }

}

export const checkRows = (board) => {
  let winner, mark
  board.state.forEach((row) => {
    mark = row[0]
    if (row.every((item) => item === mark)) winner = mark
  })
  if (winner) return winner

  return false
}
