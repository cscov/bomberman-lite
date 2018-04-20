const Board = require("./board");
const Computer = require("./computer");
const Player = require("./player");

const Bomb = require("./bomb");

class Game {
  constructor(board, computer, player, canvas, ctx, item) {
    this.board = board;
    this.computer = computer;
    this.player = player;
    this.canvas = canvas;
    this.ctx = ctx;
    this.items = [];
    this.bombs = [];
    this.avatars = [this.player, this.computer];
    this.draw = this.draw.bind(this);
  }

  allObjects() {
    return [].concat(this.items, this.bombs, this.avatars, this.board.getBricks());
  }

  draw(timestamp) {
    let start = timestamp;
    let progress = timestamp - start;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.board.draw();
    this.computer.drawPlayer();
    this.player.drawPlayer();
    if (this.player.setBomb) {
      this.bombs.forEach( bomb => {
        if (bomb.status === 1) {
          bomb.drawItem();
          window.setTimeout(bomb.detonate.bind(bomb), 3000);
          bomb.status = 2;
        } else if (bomb.status === 2) {
          bomb.drawItem();
        } else if (bomb.status === 3) {
          bomb.drawExplosion();
          this.collisionDetection();

        }
      });
    }
    if (!this.gameOver()) {
      window.requestAnimationFrame(this.draw);
    } else {
      this.displayEndMessage();
    }
  }

  start() {
    this.started = true;
    this.player.status = 1;
    this.computer.status = 1;
    const gameCover = document.getElementById('game-start-cover');
    if (gameCover.style.visibility === 'hidden') {
      gameCover.style.visibility = 'visible';
    } else {
      gameCover.style.visibility = 'hidden';
    }
    window.requestAnimationFrame(this.draw);
  }

  collisionDetection() {
    const allObjects = this.allObjects().filter( obj => obj.status > 0);
    for (let i = 0; i < allObjects.length; i++) {
      for (let j = i + 1; j < allObjects.length; j++) {
        const obj1 = allObjects[i];
        const obj2 = allObjects[j];
        if (obj1 instanceof Bomb && obj1.isCollidedWith(obj2)) {
          obj2.status = 0;
        } else if (obj2 instanceof Bomb && obj1.isCollidedWith(obj2)) {
          obj1.status = 0;
        } else {
          return;
        }
      }
    }
  }

  remove(obj) {
    if (obj instanceof Bomb) {
      this.bombs.splice(this.bombs.indexOf(obj), 1);
    } else if (obj instanceof Board) {
      this.board.getBricks().splice(this.board.getBricks().indexOf(obj), 1);
    }
  }

  gameOver() {
    return this.player.status === 0 || this.computer.status === 0;
  }

  displayEndMessage() {
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
