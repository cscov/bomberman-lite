const Player = require("./player");

class Items {
  constructor(ctx, player, type, color) {
    this.ctx = ctx;
    this.player = player;
    this.type = type;
    this.status = 1;
    this.color = color;

  }

  drawItem() {
    if (this.type === 'bomb') {
      this.ctx.beginPath();
      this.ctx.arc(this.player.currentPosition.x + 15, this.player.currentPosition.y - 44, 15, 0, Math.PI*2);
      this.ctx.fillStyle = this.color;
      this.ctx.fill();
      this.ctx.closePath();
    }
  }

  detonate() {
    this.player.bombs.pop();
    this.status = 0;
  }
}

module.exports = Items;
