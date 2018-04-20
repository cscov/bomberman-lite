const Bomb = require("./bomb");

class Computer {
  constructor(ctx, canvas, img, game) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.img = img;
    this.position = { x: canvas.width - 44, y: canvas.height - 44 };
    this.status = 1;
    this.numBombs = 1;
    this.game = game;
  }
  drawPlayer() {
    this.ctx.drawImage(this.img, this.position.x,
                       this.position.y, 44, 44);
    window.setInterval(this.movePlayer.bind(this), 1000);
  }

  movePlayer() {
    if (!this.game.started) {
      return;
    }
    let randomMove = Math.floor(Math.random() * 4);
    let move = MOVES[randomMove];
    let dx = move[0];
    let dy = move[1];

    if (this.position.x + dx < 0 || this.position.x + dx >= this.canvas.width
    || this.position.x + this.width >= this.canvas.width) {
      dx = 0;
    }
    if (this.position.y + dy < 65 || this.position.y + dy >= this.canvas.height
    || this.position.y + this.height >= this.canvas.height) {
      dy = 0;
    }
    this.position.x += dx;
    this.position.y += dy;
    this.placeBomb();
    
    return this.drawPlayer();
  }

  placeBomb() {
    if (this.numBombs === 0) {
      return;
    }
    this.numBombs -= 1;
    const bomb = new Bomb(this.ctx, this, 'bomb', "#233D4D", {x: this.position.x + 15, y: this.position.y}, this.game);
    this.game.bombs.push(bomb);
    bomb.drawItem();
    window.setTimeout(bomb.detonate.bind(bomb), 3000);
  }
}

const MOVES = [
  [22, 0],
  [-22, 0],
  [0, 22],
  [0, -22]
];

module.exports = Computer;
