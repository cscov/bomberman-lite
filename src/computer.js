class Computer {
  constructor(ctx, canvas, img) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.img = img;
    this.position = { x: canvas.width - 44, y: canvas.height - 44 };
    this.status = 1;
    this.numBombs = 1;
  }

  drawPlayer() {
    this.ctx.drawImage(this.img, this.position.x,
                       this.position.y, 44, 44);
  }
}

module.exports = Computer;
