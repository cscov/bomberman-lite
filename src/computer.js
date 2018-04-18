const MovingObject = require('./moving_objects');

class Computer extends MovingObject {
  constructor(ctx, canvas, img, board) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.img = img;
    this.board = board;
    this.startPosition = { x: canvas.width - 44, y: canvas.height - 44, status: 1 };
    this.x = canvas.width - 44;
    this.y = canvas.height - 44;
    this.dx = 2;
    this.dy = -2;

    super({velocity: [1, 0], position: [this.x, this.y]});
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
