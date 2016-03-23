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
  var newBoard = deepCopy(state)
  return newBoard
}
export const placeMark = ( {currentBoard, position, mark}) => {
  let [row, col] = BoardMap.get(position)
  let newBoard = board(currentBoard)
  if (typeof newBoard[row][col] === "number") newBoard[row][col] = mark

  return newBoard
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

export const emptyPositions = (gameBoard) => {
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
    gameType() { return `Choose 1 for human vs human game\nChoose 2 for human vs computer game\nChoose 3 for computer vs computer game\n`}
  }

export const deepCopy = (obj) => {
  let newObj = obj instanceof Array ? [] : {}
  let keys = Object.keys(obj)

  keys.forEach((key) => {
    if (typeof obj[key] === "object") {
      newObj[key] = deepCopy(obj[key])
    } else {
      newObj[key] = obj[key]
    }
  })
  return newObj
}


export const gameStore = (newState={}) => {
  let state
  if (Object.keys(newState).length === 0) {
    state = {
      player1: {},
      player2: {},
      gameBoard: board()
    }
  } else {
    state = newState
  }

  return {
    setGameType(type) {
      let newState = deepCopy(state)
      switch (type) {
        case "1":
          newState.player1.human = true
          newState.player2.human = true
          break;
        case "2":
          newState.player1.human = true
          newState.player2.human = false
          break;
        default:
          newState.player1.human = false
          newState.player2.human = false
      }
      return gameStore(newState)
    },
    getBoard() {return state.gameBoard},
    placeMove(position, mark) {
      let newState = deepCopy(state)
      newState.gameBoard = placeMark({currentBoard: newState.gameBoard, position: position, mark: mark } )
      newState.lastMove = position
      return gameStore(newState);
    },
    lastMove() { return state.lastMove},
    validMarks() { return ["X", "O"] },
    validMoves() { return emptyPositions(state.gameBoard)},
    validGameTypes() {return ["1", "2", "3"]},
    setMarks(mark) {
      let newState = deepCopy(state)
      newState.player1.mark = mark
      newState.player2.mark =  mark === "X" ? "O": "X"
      newState.turn = newState.player1.mark
      return gameStore(newState)
    },
    player1Human() { return state.player1.human },
    player2Human() { return state.player2.human },
    player1Mark() { return state.player1.mark },
    player2Mark() { return state.player2.mark},
    turn() { return state.turn },
    changeMarks() {
      let newState = deepCopy(state)
      newState.turn = newState.turn === "X" ? "O":"X"
      return gameStore(newState)
    },
    humanPlayer() {
      if (state.player1.human && state.player1.mark === state.turn) {
        return true
      }
      else if(state.player2.human && state.player2.mark === state.turn) {
        return true
      }else {
        return false
      }
    },
    computerMove() {
      if(this.validMoves().length === 9){
        return this.placeMove(4, state.turn)
      } else if(this.validMoves().length === 1){
        return this.placeMove(this.validMoves()[0], state.turn)
      }

    }

  }
}


export const possibleNextMoves = (game) => {
  let possibleMoves = emptyPositions(game.getBoard()).map((position) => game.placeMove(position, game.turn()))
  return possibleMoves
}

export const bestNextMove = (game) => {
  let possibleMoves = possibleNextMoves(game)
  let winningMove = possibleMoves.find((game) => {
    return winner(game.getBoard())
  }).lastMove()

  return winningMove
}

// Side Effect functions
import readline from "readline"

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const chooseGameType = (message=gameMessages.gameType()) => {
  let game = gameStore()
  return rl.question(message, (response) => {
    if(validateInput(game.validGameTypes(), response)){
      return chooseMark(game.setGameType(response))
    } else {
      return chooseGameType(gameMessages.invalidInput(game.validGameTypes()))
    }
  })

}

const chooseMark = (game, message=gameMessages.chooseMark()) => {
  let validMarks = game.validMarks()
  rl.question(message, (response) => {
    if(validateInput(validMarks, response)){

      return nextMove(game.setMarks(response))
    }else{
      return chooseMark(game, gameMessages.invalidInput(validMarks))
    }
  })
}


const nextMove = (game, message=gameMessages.chooseSpot(game.validMoves())) => {
  const gameWinner = winner(game.getBoard())
  if(gameWinner || game.validMoves().length < 1){
    rl.close()
    return gameOver(gameWinner)
  }

  rl.write(`${gameMessages.turn(game.turn())}`)
  rl.write(`${formatBoard(game.getBoard())}`)
  if(game.humanPlayer()){
    humanMove(game)
  }

}

const humanMove = (game, message=gameMessages.chooseSpot(game.validMoves()))=> {
  rl.question(message, (response) => {
    if(validateInput(game.validMoves(), Number(response))){
      return nextMove(
        game.placeMove(Number(response), game.turn()).changeMarks()
      )
    } else {
      return humanMove(game, gameMessages.invalidInput(game.validMoves()))
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

chooseGameType()
