class Player {
  constructor(options) {
    this.ctx = options.ctx;
    this. canvas = options.canvas;
    this.img = options.img;
    this.startPosition = { x: 0, y: 65 };
  }

  drawPlayer() {
    this.ctx.drawImage(this.img, this.startPosition.x, this.startPosition.y,
                       44, 44);
  }
}

module.exports = Player;
