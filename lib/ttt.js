/*eslint-env es6 */
import "babel-polyfill"
const BoardMap = new Map([
  [0, [0, 0]],
  [1, [0, 1]],
  [2, [0, 2]],
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


export const winner = (gameBoard) => checkRows(gameBoard) || checkColumns(gameBoard) || checkDiagonals(gameBoard)

export const possibleMoves = (gameBoard) => {
  let possible = []
  gameBoard.forEach((row) => {
    row.forEach((value) => {
      if (typeof value === "number") possible.push(value)
    })
  })

  return possible
}

export const validateInput = (validMoves, choice) => validMoves.includes(choice)


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


export const player = ({mark, human=true}) => {
  return {
    mark,
    human
  }
}

export const gameMessages =  {
    welcome(){ return "Welcome to Node CLI Tic-Tac-Toe\n" },
    invalidInput(goodChoices) {
      return `Bad Choice! Please choose one of the following: ${goodChoices.join(", ")}\n`
    },
    chooseMark() { return "Please choose the mark for player 1. X or O\n"},
    chooseSpot(emptySpots) { return `Please choose one of the following empty spots: ${emptySpots.join(", ")}\n`},
    winner(winningMark) { return `${winningMark} has won!\n`},
    turn(mark) { return `It is ${mark}'s turn\n`},
    tie() { return "It's a tie.\n"},
    gameType() { return `Choose 1 for human vs human game\nChoose 2 for human vs computer game\nChoose 3 for computer vs computer game`}
  }


export const gameStore = (gameType="1") => {
  let state = {
    gameType: gameType,
    gameBoard: board()
  }
  return {
    getGameType() {return state.gameType},
    getBoard() {return state.gameBoard},
    placeMove(position, mark) {
      state.gameBoard = placeMark({currentBoard: state.gameBoard, position: position, mark: mark } )
      return this;
    },
    validMarks() { return ["X", "O"] },
    validMoves() { return possibleMoves(state.gameBoard)},
    validGameTypes() {return ["1", "2", "3"]}
  }
}

// Side Effect functions
import readline from "readline"

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const chooseGameType = (message, validInput=["1", "2", "3"]) => {
  rl.question(message, (response) => {
    if(validateInput(validInput, response)){
      const gameState = gameStore(response)
      chooseMark(gameState)
    } else {
      chooseGameType(gameMessages.invalidInput(validInput), validInput)
    }
  })

}

const chooseMark = ({validInput=["X", "O"], nextMove, message=gameMessages.chooseMark(), gameType}) => {
  rl.question(message, (response) => {
    if(validateInput(validInput, response)){
      return nextMove({mark: response})
    }else{
      return chooseMark({message:gameMessages.invalidInput(validInput), validInput: validInput, nextMove: nextMove})
    }
  })
}


const nextMove = ({
  currentBoard=board(),
  mark,
  message=gameMessages.chooseSpot(possibleMoves(currentBoard))}) => {
  let  gameWinner = winner(currentBoard)
  if(gameWinner || possibleMoves(currentBoard).length < 1){
    rl.close()
    return gameOver(gameWinner)
  }

  rl.write(`${gameMessages.turn(mark)}`)
  rl.write(`${formatBoard(currentBoard)}`)

  rl.question(message, (response) => {
    if(validateInput(possibleMoves(currentBoard), Number(response))){
      const newBoard = placeMark({currentBoard: currentBoard, position: Number(response), mark: mark})
      return nextMove({
        currentBoard: newBoard,
        mark: mark==="X" ? "O" : "X" })
    } else {
      return nextMove({
        currentBoard: currentBoard,
        mark: mark,
        message: gameMessages.invalidInput(possibleMoves(currentBoard))
      })
    }
  })

}

const gameOver = (gameWinner) => {
  if(gameWinner === "X" || gameWinner === "O") {
    console.log(gameMessages.winner(gameWinner));
  }else {
    console.log(gameMessages.tie());
  }
}

rl.write(`${gameMessages.welcome()}`)

chooseMark({validInput: ["X", "O"], nextMove: nextMove})
