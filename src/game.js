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
          this.player.numBombs --;
          window.setTimeout(bomb.detonate.bind(bomb), 3000);
          bomb.status = 2;
        } else if (bomb.status === 2) {
          bomb.drawItem();
        } else if (bomb.status === 3) {
          bomb.drawExplosion();
          this.collisionDetection();
          this.player.bombs.pop();
        }
      });
    }
    if (!this.gameOver()) {
      window.requestAnimationFrame(this.draw);
    } else {
      this.displayEndMessage();
    }
    // this.collisionDetection();
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

  collisionDetection() {
    let playerPosition = this.player.currentPosition;
    let bombPosition;
    if (this.player.bombs) {
      bombPosition = this.player.bombs[0].position;
    }
    let leftBlastRadius = bombPosition.x - 25;
    let rightBlastRadius = bombPosition.x + 25;
    let topBlastRadius = bombPosition.y - 25;
    let bottomBlastRadius = bombPosition.y + 25;

    if (playerPosition.x > leftBlastRadius && playerPosition.x < rightBlastRadius
      && playerPosition.y > topBlastRadius && playerPosition.y < bottomBlastRadius) {
      this.player.status = 0;
      console.log("player died");
    } else {
      console.log("crisis averted");
    }
  }

  displayEndMessage() {
    debugger
    if (this.player.status === 0) {
      const modal = document.getElementById('lost');
      modal.classList.add('show');
    } else {
      const modal = document.getElementById('won');
      modal.classList.add('show');
    }
  }
}

module.exports = Game;
