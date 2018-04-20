
const Bomb = require("./bomb");

class Player {
  constructor(ctx, canvas, img, game) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.img = img;
    this.position = {x: 0, y: 65 };
    this.status = 1;
    this.numBombs = 1;
    this.game = game;
    this.width = 44;
    this.height = 44;
  }

  drawPlayer() {
    this.ctx.drawImage(this.img, this.position.x, this.position.y,
    44, 44);
  }

  keyDownHandler(e) {
    if (!this.game.started) {
      return;
    }
    let dx;
    let dy;
    if (e.key === "ArrowLeft") { // left arrow
      dx = -22;
      dy = 0;
    } else if (e.key === "ArrowDown") { // down arrow
      dx = 0;
      dy = 22;
    } else if (e.key === "ArrowUp") {
      dx = 0;
      dy = -22;
    } else if (e.key === "ArrowRight") {
      dx = 22;
      dy = 0;
    } else if (e.key === "b") {
      dx = 0;
      dy = 0;
      if (this.numBombs > 0) {
        this.setBomb = true;
        this.placeBomb();
      }
    } else {
      dx = 0;
      dy = 0;
    }
    return this.movePlayer(dx, dy);
  }

  movePlayer(dx, dy) {
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
    return this.drawPlayer();
  }

  placeBomb() {
    this.numBombs -= 1;
    const bomb = new Bomb(this.ctx, this, 'bomb', "#233D4D", {x: this.position.x + 15, y: this.position.y}, this.game);
    this.game.bombs.push(bomb);
    bomb.drawItem();
    window.setTimeout(bomb.detonate.bind(bomb), 3000);
  }
}

module.exports = Player;
