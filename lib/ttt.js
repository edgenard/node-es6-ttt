/*eslint-env es6 */
import "babel-polyfill"
const BoardMap = new Map([
  [0, [0, 0]],
  [1, [0, 1]],
  [2 [0, 2]],
  [3, [1, 0]],
  [4, [1, 1]],
  [5, [1, 2]],
  [6, [2, 0]],
  [7, [2, 1]],
  [8, [2, 2]]
])


export const board = (state=[[0, 1, 2], [3, 4, 5], [6, 7, 8]]) =>  {
  return state
}
export const placeMark = ( {currentBoard, position, mark}) => {
  let [row, col] = BoardMap.get(position)
  if (typeof currentBoard[row][col] === "number") currentBoard[row][col] = mark

  return board(currentBoard)
}

export const checkRows = (gameBoard) => {
  let winner, mark
  gameBoard.forEach((row) => {
    mark = row[0]
    if (row.every((item) => item === mark)) winner = mark
  })
  if (winner) return winner

  return false
}

export const checkColumns = (gameBoard) => {
  const transposed = gameBoard.map((row, rowIndex, arr) => {
    return row.map((value, colIndex) => arr[colIndex][rowIndex])
  })

  return checkRows(board(transposed))
}

export const checkDiagonals = (gameBoard) => {
  const diagonals = [
    [gameBoard[0][0], gameBoard[1][1], gameBoard[2][2]],
    [gameBoard[0][2], gameBoard[1][1], gameBoard[2][0]]
  ]

  return checkRows(diagonals)
}

export const possibleMoves = (gameBoard) => {
  let possible = []
  gameBoard.forEach((row) => {
    row.forEach((value) => {
      if (typeof value === "number") possible.push(value)
    })
  })

  return possible
}

export const validateInput = (validMoves, choice) => validMoves.includes(Number(choice))

export const formatBoard = (gameBoard) => {
  let stringBoard = ""
  gameBoard.forEach((row) => {
    let stringRow = ""
    row.forEach((value) => stringRow += " "+ value + " |")
    stringRow = stringRow.slice(1, -2)
    stringBoard += stringRow + "\n"
  })

  return stringBoard
}

const output = (message) => {
  process.stdout.write(`${message}\n`)
}


export const input = () => {
  process.stdin.setEncoding("utf8")
  return new Promise((resolve) => {
    process.stdin.on("data", (data) => {
      resolve(data.toString().trim())
    })
  })
}

export const player = ({mark, human=true}) => {
  return {
    mark,
    human
  }
}

export const messages = () => {
  return {
    welcome(){ return "Welcome to Node CLI Tic-Tac-Toe" }
  }
}
