
import {assert} from "chai"
import {board} from "../lib/board.js"

describe("Board", function () {
  it("board is an array", function () {

    assert.isArray(board())
  })

  it("board defaults to numbers 0 to 8", function () {
    assert.deepEqual(board(), [0, 1, 2, 3, 4, 5, 6, 7, 8])
  })


})
