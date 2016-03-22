
import {assert} from "chai"
import {
  board,
  placeMark,
  checkRows,
  checkColumns,
  checkDiagonals,
  possibleMoves,
  formatBoard,
  validateInput,
  player,
  gameMessages,
  winner,
  gameState} from "./ttt.js"

describe("Tic Tac Toe", function () {

  it("board defaults to numbers 0 to 8", function () {
    assert.deepEqual(board(), [[0, 1, 2], [3, 4, 5], [6, 7, 8]])
  })

  it("placeMark puts mark and produces a new board",function () {
    const newBoard = placeMark({currentBoard: board(), position: 4, mark: "X"} )
    assert.deepEqual(newBoard, [[0, 1, 2], [3, "X", 5], [6, 7, 8]])
  })

  it("placeMark returns board unchanged if spot is filled", function () {
    const newBoard = placeMark({
      currentBoard: board([[0, 1, 2], [3, "X", 5], [6, 7, 8]]),
      position: 4,
      mark: "O"
    })
    assert.deepEqual(newBoard, [[0, 1, 2], [3, "X", 5], [6, 7, 8]] )
  })

  it("checkRows returns the winning mark for top row", function () {
    const gameBoard = board([["X", "X", "X"], [3, 4, 5], [6, 7, 8]])

    assert.equal(checkRows(gameBoard), "X")
  })

  it("checkRows returns winning mark for middle row", function () {
    const gameBoard = board([[0, 1, 2], ["O", "O", "O"], [6, 7, 8]])

    assert.equal(checkRows(gameBoard), "O")
  })

  it("checkRows returns winning mark for bottom row", function () {
    const gameBoard = board([[0, 1, 2], [3, 4, 5], ["X", "X", "X"]])

    assert.equal(checkRows(gameBoard), "X")
  })

  it("checkRows returns false if no winner", function () {
    const gameBoard = board([[0, 1, "O"], ["O", "O", 5], [6, "X", "X"]])

    assert.equal(checkRows(gameBoard), false)
  })

  it("checkColumns returns winner", function () {
    const gameBoard = board([[0, "O", 2], [3, "O", 5], [6, "O", 7]])

    assert.equal(checkColumns(gameBoard), "O")
  })

  it("checkColumns returns false if no winner", function () {
    const gameBoard = board([[0, 1, "O"], ["O", "O", 5], [6, "X", "X"]])

    assert.equal(checkColumns(gameBoard), false)
  })

  it("checkDiagonals returns a winner",function () {
    const gameBoard = board([["X", 1, 2], [3, "X", 5], [6, 7, "X"]])

    assert.equal(checkDiagonals(gameBoard), "X")
  })

  it("checkDiagonals returns false if no winner",function () {
    const gameBoard = board([["O", 1, 2], [3, "X", 5], [6, 7, "O"]])

    assert.isFalse(checkDiagonals(gameBoard))
  })

  it("winner returns winning mark", function () {
    const gameBoard = board([["X", 1, 2], [3, "X", 5], [6, 7, "X"]])

    assert.equal(winner(gameBoard), "X")

  })

  it("possibleMoves returns an array of possible moves", function () {
    const gameBoard = board([["O", 1, 2], [3, "X", 5], [6, 7, "O"]])

    assert.deepEqual(possibleMoves(gameBoard), [1, 2, 3, 5, 6, 7])
  })

  it("formatBoard returns a string rep of board", function () {
    const gameBoard = board([[0, 1, 2], [3, "X", 5], [6, 7, 8]])

    assert.equal(formatBoard(gameBoard), `0 | 1 | 2\n3 | X | 5\n6 | 7 | 8\n`)
  })


  it("validateInput returns true for valid input", function () {
    const gameBoard = board([["O", 1, 2], [3, "X", 5], [6, 7, "O"]])
    const emptyPositions = possibleMoves(gameBoard)
    const choice = "3"

    assert.isTrue(validateInput(emptyPositions, Number(choice)))
  })

  it("validateInput returns false for invalid input", function () {
    const gameBoard = board([["O", 1, 2], [3, "X", 5], [6, 7, "O"]])
    const emptyPositions = possibleMoves(gameBoard)
    const choice = "4"

    assert.isFalse(validateInput(emptyPositions, Number(choice)))
  })

  it("validateInput checks for X or O", function () {

    assert.isTrue(validateInput(["X", "O"], "X"))
  })

  it("player has a mark", function () {
    const currentPlayer = player({mark:"X"})

    assert.equal(currentPlayer.mark, "X")
  })

  it("player is human by default", function () {
    const currentPlayer = player({mark: "X"})

    assert.isTrue(currentPlayer.human)
  })


  it("there is a welcome message", function () {


    assert.equal(gameMessages.welcome(), "Welcome to Node CLI Tic-Tac-Toe\n")
  })

  it("has invalid input message", function () {
    const gameBoard = board([["O", 1, 2], [3, "X", 5], [6, 7, "O"]])

    assert.equal(gameMessages.invalidInput(possibleMoves(gameBoard)),
  "Bad Choice! Please choose one of the following: 1, 2, 3, 5, 6, 7\n")
  })

  it("has message to choose mark", function () {

    assert.equal(gameMessages.chooseMark(), "Please choose the mark for player 1. X or O\n")
  })

  it("has message to choose empty spot", function () {
    const gameBoard = board([["O", 1, 2], [3, "X", 5], [6, 7, "O"]])

    assert.equal(gameMessages.chooseSpot(possibleMoves(gameBoard)),"Please choose one of the following empty spots: 1, 2, 3, 5, 6, 7\n" )
  })

  it("has a message to announce winner", function () {
    assert.equal(gameMessages.winner("X"), "X has won!\n")
  })

  it("has a message  for players turn", function () {
    assert.equal(gameMessages.turn("O"), "It is O's turn\n")
  })

  it("has a message for announcing tie", function () {
    assert.equal(gameMessages.tie(), "It's a tie.\n")
  })

  it("has a message to ask for type of game", function () {
    assert.equal(gameMessages.gameType(),
    `Choose 1 for human vs human game\nChoose 2 for human vs computer game\nChoose 3 for computer vs computer game`)
  })

  it("gameState has a default gameType", function () {
    assert.equal(gameState({}).gameType, "1")
  })

})
