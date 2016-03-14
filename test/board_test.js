
import {assert} from "chai"
import {Board} from "../lib/board.js"

describe("Board", function () {
  it("board state is an array", function () {
    const board = Board();
    assert.isArray(board.state)
  })
})
