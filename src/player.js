class Player {
  constructor(ctx, canvas, img) {
    this.ctx = ctx;
    this. canvas = canvas;
    this.img = img;
    this.startPosition = { x: 0, y: 65 };
  }

  drawPlayer() {
    this.ctx.drawImage(this.img, this.startPosition.x, this.startPosition.y,
                       44, 44);
  }
}

module.exports = Player;
