const Player = require("./player");

class Items {
  constructor(ctx, player, type, color, position) {
    this.ctx = ctx;
    this.player = player;
    this.type = type;
    this.status = 1;
    this.color = color;
    this.position = {x: position.x, y: position.y};

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

  detonate() {
    // this.drawExplosion = this.drawExplosion.bind(this);
    this.status = 3;
  }


  drawExplosion() {
    console.log("explosion starting");
    this.ctx.beginPath();
    this.ctx.arc(this.position.x, this.position.y, 20, 0, Math.PI*2);
    this.ctx.fillStyle = "#233D4D";
    this.ctx.fill();
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.arc(this.position.x, this.position.y, 15, 0, Math.PI*2);
    this.ctx.fillStyle = "#64a7d1";
    this.ctx.fill();
    this.ctx.closePath();

    this.player.bombs.pop();
    this.player.numBombs ++;

    // this.status = 0;
  }
}

module.exports = Items;
