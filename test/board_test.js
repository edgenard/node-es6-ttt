
import {assert} from "chai"
import {Board} from "../lib/board.js"

describe("Board", function () {
  it("board is an array", function () {
    const board = Board([])
    assert.isArray(board)
  })

  it("board  defaults to numbers 0 to 8", function () {
    const board = Board()
    assert.deepEqual(board, [0, 1, 2, 3, 4, 5, 6, 7, 8])
  })

})
