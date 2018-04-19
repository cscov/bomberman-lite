const Board = require("./board");
const Computer = require("./computer");
const Player = require("./player");

class Game {
  constructor(board, computer, player, canvas, ctx) {
    this.board = board;
    this.computer = computer;
    this.player = player;
    this.canvas = canvas;
    this.ctx = ctx;
    this.draw = this.draw.bind(this);
  }

  draw(timestamp) {
    let start = timestamp;
    let progress = timestamp - start;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.board.draw();
    this.computer.drawPlayer();
    this.player.drawPlayer();
    if (!this.gameOver()) {
      window.requestAnimationFrame(this.draw);
    }
  }

  start() {
    window.requestAnimationFrame(this.draw);
  }

  gameOver() {
    return this.player.status === 0 || this.computer.status === 0;
  }
}

module.exports = Game;
