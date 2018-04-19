

class Items {
  constructor(ctx, player, type) {
    this.ctx = ctx;
    this.player = player;
    this.type = type;
    this.status = 1;

  }

  drawItem() {
    if (this.type === 'bomb') {
      this.ctx.beginPath();
      this.ctx.arc(this.player.currentPosition.x + 15, this.player.currentPosition.y - 44, 15, 0, Math.PI*2);
        this.ctx.fillStyle = "#000000";
      this.ctx.fill();
      this.ctx.closePath();
    }
  }
}

module.exports = Items;
