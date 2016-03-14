
import {assert} from "chai"
import {Board} from "../lib/board.js"

describe("Board", function () {
  it("board state is an array", function () {
    const board = Board()
    assert.isArray(board.state)
  })

  it("board.state defaults to numbers 0 to 8", function () {
    const board = Board()
    assert.deepEqual(board.state, [0, 1, 2, 3, 4, 5, 6, 7, 8])
  })
})
