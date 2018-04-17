class Computer {
  constructor(ctx, canvas, img) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.img = img;
    this.startPosition = { x: canvas.width - 44, y: canvas.height - 44 };
  }

  drawPlayer() {
    this.ctx.drawImage(this.img, this.startPosition.x,
                       this.startPosition.y, 44, 44);
  }
}

module.exports = Computer;
