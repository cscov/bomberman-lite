class Board {
  constructor(canvas, ctx, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.canvas = canvas;
  }

  initializePermanentBricks() {
    const brickColumnCount = 6;
    const brickRowCount = 5;
    const brickWidth = 40;
    const brickHeight = 40;
    const brickOffsetLeft = 175;
    const brickOffsetTop = 100;
    const brickPadding = 100;

    const bricks = [];
    for (let c = 0; c < brickColumnCount; c++) {
      bricks[c] = [];
      for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0};
        let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
        let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;

        this.ctx.beginPath();
        this.ctx.rect(brickX, brickY, brickWidth, brickHeight);
        this.ctx.fillStyle = "#000";
        this.ctx.fill();
        this.ctx.closePath();
      }
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.initializePermanentBricks();
  }
}

module.exports = Board;
