
class Computer {
  constructor(ctx, canvas, img, game) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.img = img;
    this.currentPosition = { x: canvas.width - 44, y: canvas.height - 44 };
    this.status = 1;
    this.game = game;
    this.moveKeys = ['left', 'up', 'right', 'down'];
  }

  drawPlayer() {
    this.ctx.drawImage(this.img, this.currentPosition.x,
                       this.currentPosition.y, 44, 44);
  }

  walkingCollisionDetection(dx, dy) {
    const bricks = this.game.board.allVisibleBricks();
    for (let i = 0; i < bricks.length; i++) {
      if ((this.currentPosition.x + 22) + dx >= bricks[i].x &&
      (this.currentPosition.x + 22) + dx <= bricks[i].x + 44 &&
      (this.currentPosition.y + 22) + dy >= bricks[i].y &&
      (this.currentPosition.y + 22) + dy <= bricks[i].y + 44) {
        return {dx: 0, dy: 0};
      }
    }
    if ((this.currentPosition.x + 22) + dx >= this.game.player.currentPosition.x
        && (this.currentPosition.x + 22) + dx <= this.game.player.currentPosition.x + 22
        && (this.currentPosition.y + 22) + dy >= this.game.player.currentPosition.y
        && (this.currentPosition.y + 22) + dy <= this.game.player.currentPosition.y + 22) {
      return { dx: 0, dy: 0};
    }

    return { dx, dy };
  }

  handleAction() {
    if (!this.game.started) {
      return;
    }
    let dx = 0;
    let dy = 0;
    let newMove = { dx: 0, dy: 0 };
    let moveIndex = Math.floor(Math.random() * 4); // moves.length
    let moveKey = this.moveKeys[moveIndex];

    if (moveKey === 'left') {
      dx = -22;
      dy = 0;
      newMove = this.walkingCollisionDetection(dx, dy);
    } else if (moveKey === 'up') {
      dx = 0;
      dy = -22;
      newMove = this.walkingCollisionDetection(dx, dy);
    } else if (moveKey === 'right') {
      dx = 22;
      dy = 0;
      newMove = this.walkingCollisionDetection(dx, dy);
    } else if (moveKey === 'down') {
      dx = 0;
      dy = 22;
      newMove = this.walkingCollisionDetection(dx, dy);
    }
    dx = newMove.dx;
    dy = newMove.dy;
    return this.moveComputer(dx, dy);
  }

  moveComputer(dx, dy) {
    if (this.currentPosition.x + dx < 0 || this.currentPosition.x + dx >= this.canvas.width) {
      dx = 0;
    }
    if (this.currentPosition.y + dy < 65 || this.currentPosition.y + dy >= this.canvas.height) {
      dy = 0;
    }
    this.currentPosition.x += dx;
    this.currentPosition.y += dy;
    return this.drawPlayer();
  }
}

module.exports = Computer;
