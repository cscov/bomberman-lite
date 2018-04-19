const Item = require("./items");

class Player {
  constructor(ctx, canvas, img, game) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.img = img;
    this.currentPosition = {x: 0, y: 65 };
    this.status = 1;
    this.numBombs = 1;
    this.bombs = [];
    this.game = game;
  }

  drawPlayer() {
    this.ctx.drawImage(this.img, this.currentPosition.x, this.currentPosition.y,
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

  // keyUpHandler(e) {
  //   let dx = 0;
  //   let dy = 0;
  //
  //   return this.movePlayer(dx, dy);
  // }

  movePlayer(dx, dy) {
    if (this.currentPosition.x + dx < 0 || this.currentPosition.x + dx >= this.canvas.width) {
      dx = 0;
    }
    if (this.currentPosition.y + dy < 65 || this.currentPosition.y + dy >= this.canvas.height) {
      dy = 0;
    }
    this.currentPosition.x += dx;
    this.currentPosition.y += dy;
    return this.drawPlayer();
  }

  placeBomb() {
    const bomb = new Item(this.ctx, this, 'bomb', "#233D4D", {x: this.currentPosition.x + 15, y: this.currentPosition.y - 15});
    this.bombs.push(bomb);
    bomb.drawItem();
    window.setTimeout(bomb.detonate.bind(bomb), 3000);
  }
}

module.exports = Player;
