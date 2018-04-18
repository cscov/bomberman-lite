const MovingObject = require('./moving_objects');

class Computer extends MovingObject {
  constructor(options) {
    super(options);
    options.velocity = options.velocity || [1, 0];
    options.position = options.position;
    this.ctx = options.ctx;
    this.canvas = options.canvasEl;
    this.img = options.img;
    this.board = options.board;
    this.position = { x: options.canvasEl.width - 44, y: options.canvasEl.height - 44};
    this.startPosition = { x: options.canvasEl.width - 44, y: options.canvasEl.height - 44, status: 1 };
    this.dx = 2;
    this.dy = -2;
  }

  drawPlayer() {
    this.ctx.drawImage(this.img, this.startPosition.x,
                       this.startPosition.y, 44, 44);
  }

  collisionDetection() {
    const bricks = [];
    for (let c = 0; c < this.board.getBrickColumnCount; c++) {
      for (let r = 0; r < this.board.getBrickRowCount; r++) {
        let b = bricks[c][r];
        if (b.status === 2) {
          if (this.x > b.x && this.x < b.x + this.board.getBrickWidth) {
            this.dx = this.dx * -1;
          }
          if (this.y > b.y && this.y < b.y + this.board.getBrickHeight) {
            this.dy = this.dy * -1;
          }
        }
      }
    }
  }

  movePlayer(delta) {
    this.move(delta);
  }

  step(delta) {
    this.movePlayer(delta);
    this.x += this.dx;
    this.y += this.dy;
    this.collisionDetection();
  }

  isComputerDead() {
    return this.startPosition.status === 0;
  }
}

module.exports = Computer;
