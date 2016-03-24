# Command Line Tic Tac Toe in es6/2015

An attempt to write a cli tic-tac-toe game in node and es6/2015 using as many pure functions as possible.

The main logic is a series of pure functions that are tested and the interactive part uses node's readline module and is not tested. The state of the game is stored in an immutable object(`gameStore`, like redux's `store`) and a new one is created with each change in the game. 

To play

```
npm install
npm rebuild
npm run play
```

To test
```
npm test
```
