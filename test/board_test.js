
import {assert} from "chai"
import {board, placeMark} from "../lib/board.js"

describe("Board", function () {
  it("board is an array", function () {

    assert.isArray(board())
  })

  it("board defaults to numbers 0 to 8", function () {
    assert.deepEqual(board(), [0, 1, 2, 3, 4, 5, 6, 7, 8])
  })

  it("placeMark puts mark and produces a new board",function () {
    const newBoard = placeMark({currentBoard: board(), position: 4, mark: "X"} )
    assert.deepEqual(newBoard, [0, 1, 2, 3, "X", 5, 6, 7, 8])
  })

  it("placeMark returns board unchanged if spot is filled", function () {
    const newBoard = placeMark({
      currentBoard: board([0, 1, 2, 3, "X", 5, 6, 7, 8]),
      position: 4,
      mark: "O"
    })
    assert.deepEqual(newBoard, [0, 1, 2, 3, "X", 5, 6, 7, 8] )
  })

})