const Board = require("./board");
const Computer = require("./computer");
const Player = require("./player");

class Game {
  constructor(board, computer, player) {
    this.board = board;
    this.computer = computer;
    this.player = player;
  }

  

  start() {
    console.log("start button is working!");
  }
}

module.exports = Game;
