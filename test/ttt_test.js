
import {assert} from "chai"
import {stdin} from "mock-stdin"
import {
  board,
  placeMark,
  checkRows,
  checkColumns,
  checkDiagonals,
  possibleMoves,
  formatBoard,
  validateInput,
  getUserMove,
  input,
  player,
  messages,
  winner} from "../lib/ttt.js"

describe("Board", function () {

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

  it("input captures user input", function () {
    const mock_stdin = stdin()

    process.nextTick(() => mock_stdin.send("input"))

    return input().then((response) => assert.equal(response, "input"))
  })

  it("player has a mark", function () {
    const currentPlayer = player({mark:"X"})

    assert.equal(currentPlayer.mark, "X")
  })

  it("player is human", function () {
    const currentPlayer = player({mark: "X", human: true})

    assert.isTrue(currentPlayer.human)
  })


  it("there is a welcome message", function () {
    const game_messages = messages()

    assert.equal(game_messages.welcome(), "Welcome to Node CLI Tic-Tac-Toe")
  })

  it("has invalid input message", function () {
    const game_board = board([["O", 1, 2], [3, "X", 5], [6, 7, "O"]])
    const game_messages = messages()

    assert.equal(game_messages.invalidInput(possibleMoves(game_board)),
  "Bad Choice! Please choose one of the following: 1, 2, 3, 5, 6, 7")
  })

  it("has message to choose mark", function () {
    const game_messages = messages()

    assert.equal(game_messages.chooseMark(), "Please choose the mark for player 1. X or O")
  })

  it("has message to choose empty spot", function () {
    const game_messages = messages()
    const game_board = board([["O", 1, 2], [3, "X", 5], [6, 7, "O"]])

    assert.equal(game_messages.chooseSpot(possibleMoves(game_board)),"Please choose one of the following empty spots: 1, 2, 3, 5, 6, 7" )
  })

})
