const Player = require("./player");

class Bomb {
  constructor(ctx, player, type, color, position, game) {
    this.ctx = ctx;
    this.player = player;
    this.type = type;
    this.status = 1;
    this.color = color;
    this.position = {x: position.x, y: position.y};
    this.blastRadius = 50;
    this.game = game;
  }

  drawItem() {
    if (this.type === 'bomb') {
      this.ctx.beginPath();
      this.ctx.arc(this.position.x, this.position.y, 15, 0, Math.PI*2);
      this.ctx.fillStyle = this.color;
      this.ctx.fill();
      this.ctx.closePath();
    }
  }

  isCollidedWith(otherObj) {
    let leftX = this.position.x - this.blastRadius;
    let rightX = this.position.x + this.blastRadius;
    let upY = this.position.y + this.blastRadius;
    let downY = this.position.y - this.blastRadius;

    if (otherObj.position.x > leftX && otherObj.position.x < this.position.x) {
      return true;
    }
    if (otherObj.position.x > this.position.x && otherObj.position.x < rightX) {
      return true;
    }
    if (otherObj.position.y > this.position.y && otherObj.position.y < upY) {
      return true;
    }
    if (otherObj.position.y < this.position.y && otherObj.position.y > downY) {
      return true;
    }
    return false;
  }

  detonate() {
    this.status = 3;
  }


  drawExplosion() {
    this.ctx.beginPath();
    this.ctx.arc(this.position.x, this.position.y, 50, 0, Math.PI*2);
    this.ctx.fillStyle = "#233D4D";
    this.ctx.fill();
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.arc(this.position.x, this.position.y, 40, 0, Math.PI*2);
    this.ctx.fillStyle = "#64a7d1";
    this.ctx.fill();
    this.ctx.closePath();

    this.player.numBombs += 1;
    this.player.setBomb = false;

    this.game.remove(this);

  }
}

module.exports = Bomb;
