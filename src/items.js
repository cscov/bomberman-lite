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
    window.setTimeout(this.drawExplosion.bind(this));
    this.player.bombs.pop();
    this.status = 0;
  }

  drawExplosion() {

    this.ctx.beginPath();
    this.ctx.arc(this.position.x, this.position.y, 15, 0, Math.PI*2);
    this.ctx.fillStyle = "#f4a142";
    this.ctx.fill();
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.arc(this.position.x, this.position.y, 7, 0, Math.PI*2);
    this.ctx.fillStyle = "#f4e841";
    this.ctx.fill();
    this.ctx.closePath();
  }
}

module.exports = Items;
