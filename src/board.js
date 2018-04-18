class Board {
  constructor(canvas, ctx, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.canvas = canvas;
    this.brickColumnCount = 25;
    this.brickRowCount = 12;
    this.brickWidth = 44;
    this.brickHeight = 44;
  }

  drawBricks() {
    const brickOffsetLeft = 44;
    const brickOffsetTop = 65;
    const brickPadding = 44;

    const bricks = [];
    for (let c = 0; c < this.brickColumnCount; c++) {
      bricks[c] = [];
      for (let r = 0; r < this.brickRowCount; r++) {
        if (c % 5 === 0) {
          bricks[c][r] = { x: 0, y: 0, status: 2 };
          this.ctx.fillStyle = "#F1F7ED";
        } else {
          let displayBrick = Math.floor(Math.random() * 2);
          bricks[c][r] = { x: 0, y: 0, status: displayBrick};
          this.ctx.fillStyle = "#A4243B";
        }
        if (bricks[c][r].status === 2 || bricks[c][r].status === 1) {
          let brickX = (c * (this.brickWidth + brickPadding)) + brickOffsetLeft;
          let brickY = (r * (this.brickHeight + brickPadding)) + brickOffsetTop;
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;

          this.ctx.beginPath();
          this.ctx.rect(brickX, brickY, this.brickWidth, this.brickHeight);
          this.ctx.fill();
          this.ctx.closePath();
        }
      }
    }
  }

  getBrickColumnCount(){
    return this.brickColumnCount;
  }

  getBrickRowCount() {
    return this.brickRowCount;
  }

  getBrickWidth() {
    return this.brickWidth;
  }

  getBrickHeight() {
    return this.brickHeight;
  }


  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawBricks();
  }
}

module.exports = Board;
