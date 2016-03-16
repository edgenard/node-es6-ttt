
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
  getUserMove} from "../lib/board.js"

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

    assert.isTrue(validateInput(emptyPositions, choice))
  })

  it("validateInput returns false for invalid input", function () {
    const gameBoard = board([["O", 1, 2], [3, "X", 5], [6, 7, "O"]])
    const emptyPositions = possibleMoves(gameBoard)
    const choice = "4"

    assert.isFalse(validateInput(emptyPositions, choice))
  })

})
