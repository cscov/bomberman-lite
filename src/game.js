const Board = require("./board");
const Computer = require("./computer");
const Player = require("./player");
const Item = require("./items");

class Game {
  constructor(board, computer, player, canvas, ctx) {
    this.board = board;
    this.computer = computer;
    this.player = player;
    this.canvas = canvas;
    this.ctx = ctx;
    this.items = this.player.bombs.concat(this.computer.bombs);
    this.destroyables = this.allDestroyableObjects();
    this.draw = this.draw.bind(this);
  }

  allDestroyableObjects() {
    return this.board.bricksStillStanding().concat(this.computer, this.player,
    this.player.bombs, this.computer.bombs);
  }

  draw(timestamp) {
    let start = timestamp;
    let progress = timestamp - start;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.board.draw();
    this.computer.drawPlayer();
    this.player.drawPlayer();
    if (this.player.setBomb) {
      this.destroyables = this.allDestroyableObjects();
      this.player.bombs.forEach( bomb => {
        if (bomb.status === 1) {
          bomb.drawItem();
          this.player.numBombs -= 1;
          window.setTimeout(bomb.detonate.bind(bomb), 3000);
          bomb.status = 2;
        } else if (bomb.status === 2) {
          bomb.drawItem();
        } else if (bomb.status === 3) {
          bomb.drawExplosion();
          this.collisionDetection();
          this.player.bombs.pop();
          this.player.setBomb = false;
          this.player.numBombs += 1;
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
    const gameCover = document.getElementById('game-start-cover');
    if (gameCover.style.visibility === 'hidden') {
      gameCover.style.visibility = 'visible';
    } else {
      gameCover.style.visibility = 'hidden';
    }

    this.drawId = window.requestAnimationFrame(this.draw);
  }

  gameOver() {
    return this.player.status === 0 || this.computer.status === 0;
  }

  collisionDetection() {
    let bombPosition;
    if (this.player.bombs) {
      bombPosition = this.player.bombs[0].position;
    }
    let leftBlastRadius = bombPosition.x - 25;
    let rightBlastRadius = bombPosition.x + 25;
    let topBlastRadius = bombPosition.y - 25;
    let bottomBlastRadius = bombPosition.y + 25;

    const collidedBrick = this.board.bricksStillStanding().filter(
      brick => brick.x > leftBlastRadius && brick.x < rightBlastRadius
    && brick.y > topBlastRadius && brick.y < bottomBlastRadius);

    console.log(collidedBrick);
  }

  displayEndMessage() {
    this.started = false;
    if (this.player.status === 0) {
      const modal = document.getElementById('lost');
      modal.classList.add("show");
    } else {
      const modal = document.getElementById('won');
      modal.classList.add('show');
    }
  }
}

module.exports = Game;
