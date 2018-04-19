const Board = require("./board");
const Computer = require("./computer");
const Player = require("./player");
const Item = require("./items");

class Game {
  constructor(board, computer, player, canvas, ctx, item) {
    this.board = board;
    this.computer = computer;
    this.player = player;
    this.canvas = canvas;
    this.ctx = ctx;
    this.item = item;
    this.draw = this.draw.bind(this);
  }

  draw(timestamp) {
    let start = timestamp;
    let progress = timestamp - start;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.board.draw();
    this.computer.drawPlayer();
    this.player.drawPlayer();
    if (this.player.setBomb) {
      this.player.bombs.forEach( bomb => {
        if (bomb.status === 1) {
          bomb.drawItem();
        }
      });
    }
    if (!this.gameOver()) {
      window.requestAnimationFrame(this.draw);
    }
  }

  start() {
    this.started = true;
    const gameCover = document.getElementById('game-start-cover');
    if (gameCover.style.visibility === 'hidden') {
      gameCover.style.visibility = 'visible';
    } else {
      gameCover.style.visibility = 'hidden';
    }

    window.requestAnimationFrame(this.draw);
  }

  gameOver() {
    return this.player.status === 0 || this.computer.status === 0;
  }
}

module.exports = Game;
