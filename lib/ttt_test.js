
import {assert} from "chai"
import {
  board,
  placeMark,
  checkRows,
  checkColumns,
  checkDiagonals,
  emptyPositions,
  formatBoard,
  validateInput,
  player,
  gameMessages,
  winner,
  deepCopy,
  gameStore,
  possibleMoves} from "./ttt.js"

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

    assert.deepEqual(emptyPositions(gameBoard), [1, 2, 3, 5, 6, 7])
  })

  it("formatBoard returns a string rep of board", function () {
    const gameBoard = board([[0, 1, 2], [3, "X", 5], [6, 7, 8]])

    assert.equal(formatBoard(gameBoard), `0 | 1 | 2\n3 | X | 5\n6 | 7 | 8\n`)
  })


  it("validateInput returns true for valid input", function () {
    const gameBoard = board([["O", 1, 2], [3, "X", 5], [6, 7, "O"]])
    const choice = "3"

    assert.isTrue(validateInput(emptyPositions(gameBoard), Number(choice)))
  })

  it("validateInput returns false for invalid input", function () {
    const gameBoard = board([["O", 1, 2], [3, "X", 5], [6, 7, "O"]])
    const choice = "4"

    assert.isFalse(validateInput(emptyPositions(gameBoard), Number(choice)))
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

    assert.equal(gameMessages.invalidInput(emptyPositions(gameBoard)),
  "Bad Choice! Please choose one of the following: 1, 2, 3, 5, 6, 7\n")
  })

  it("has message to choose mark", function () {

    assert.equal(gameMessages.chooseMark(), "Please choose the mark for player 1. X or O\n")
  })

  it("has message to choose empty spot", function () {
    const gameBoard = board([["O", 1, 2], [3, "X", 5], [6, 7, "O"]])

    assert.equal(gameMessages.chooseSpot(emptyPositions(gameBoard)),"Please choose one of the following empty spots: 1, 2, 3, 5, 6, 7\n" )
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
    `Choose 1 for human vs human game\nChoose 2 for human vs computer game\nChoose 3 for computer vs computer game\n`)
  })

  describe("deepCopy", function () {
    it("returns new object with same values", function () {
      let obj1 = { a:[1, 2, 3], b: { c: [[3]]}, d: "1"}
      let obj2 = deepCopy(obj1)

      assert.deepEqual(obj1, obj2)
    })

    it("change in copy does not effect original", function () {
      let obj1 = { a:[1, 2, 3], b: { c: [[3]]}, d:"1"}
      let obj2 = deepCopy(obj1)

      obj2.b.c[0][0] = 4
      obj2.a[0] = "Ok"
      obj2.d = "3"

      assert.notDeepEqual(obj1, obj2)
    })

  })

  describe("gameStore", function () {
    it("setGameType sets up player types", function () {
      let game = gameStore()
      game = game.setGameType("2")
      assert.isTrue(game.player1Human())
      assert.isFalse(game.player2Human())
    })

    it("setGameType returns new instance of game", function () {
      let game1 = gameStore()
      let game2 = game1.setGameType("2")

      assert.notEqual(game1.player1Human(), true)
    })

    it("gameStore has default board", function () {
      assert.deepEqual(gameStore().getBoard(), board())
    })


    it("placeMove returns new store with board", function () {
      let game = gameStore()

      game = game.placeMove(4, "X")

      assert.deepEqual(game.getBoard(),[[0, 1, 2], [3, "X", 5], [6, 7, 8]] )
    })

    it("placeMove returns new instance of game with each call", function () {
      let game1 = gameStore()
      let game2 = game1.placeMove(4, "X")

      assert.notDeepEqual(game1.getBoard(), game2.getBoard())
    })

    it("validMarks returns valid game marks", function () {
      let gameState = gameStore()

      assert.deepEqual(gameState.validMarks(), ["X", "O"])
    })

    it("validMoves returns empty spots on the board", function () {
      let game = gameStore()
      game = game.placeMove(8, "O")
      assert.deepEqual(game.validMoves(), [0, 1, 2, 3, 4, 5, 6, 7])
    })

    it("validGameTypes returns valid game types", function () {
      assert.deepEqual(gameStore().validGameTypes(), ["1", "2", "3"])
    })

    it("setMarks sets the marks for players", function () {
      let game = gameStore()
      game = game.setMarks("X")

      assert.equal(game.player1Mark(), "X")
      assert.equal(game.player2Mark(), "O")
    })

    it("setMarks sets the turn", function () {
      let game = gameStore().setMarks("O")

      assert.equal(game.turn(), "O")
    })

    it("setMarks returns new instance of game with each call", function () {
      let game1 = gameStore()
      let game2 = game1.setMarks("O")
      assert.notEqual(game1.player1Mark(), "O")
    })

    it("changeMark switches mark", function () {
      let game = gameStore().setMarks("X").changeMarks()

      assert.equal(game.turn(), "O")
    })

    it("changeMarks returns new instance of game with each call", function () {
      let game1 = gameStore().setMarks("O")
      let game2 = game1.changeMarks()

      assert.notEqual(game1.turn(), game2.turn())
    })

    it("humanPlayer returns true if it's humans turn", function () {
      let game = gameStore().setGameType("2").setMarks("X")

      assert.isTrue(game.humanPlayer())
    })

    it("humanPlayer returns false if it's computer's turn", function () {
      let game = gameStore().setGameType("2").setMarks("X").changeMarks()

      assert.isFalse(game.humanPlayer())
    })

    it("computerMove makes default move on empty board", function () {
      let game = gameStore().setGameType("3").setMarks("X").computerMove()

      assert.deepEqual(game.getBoard(), [[0, 1, 2], [3, "X", 5], [6, 7, 8]] )
    })

    it("computerMove makes only move left", function () {
      let game = gameStore().
        placeMove(0, "X").placeMove(1, "O").placeMove(2, "X").
        placeMove(3, "O").placeMove(4, "X").placeMove(5, "O").
        placeMove(6, "O").placeMove(7, "X").setMarks("O").computerMove()


      assert.deepEqual(game.getBoard(), [["X", "O", "X"], ["O", "X", "O"], ["O", "X", "O"]])
    })
  })

  describe.skip("Best Computer Move", function () {
    it("possibleMoves return array of all following states", function () {
      let game = gameStore().setGameType("3").setMarks("X").
                 placeMove(0, "X").placeMove(1, "O").placeMove(2, "X").
                 placeMove(3, "O").placeMove(4, "X").placeMove(5, "O")

      let followingStates = [
        game.placeMove(6, "X"), game.placeMove(7, "X"), game.placeMove(8, "X")
      ]

      assert.deepEqual(possibleMoves(game), followingStates )
    })
  })



})
