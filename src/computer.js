class Computer {
  constructor(ctx, canvas, img, game) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.img = img;
    this.currentPosition = { x: canvas.width - 44, y: canvas.height - 44 };
    this.status = 1;
    this.numBombs = 1;
    this.bombs = [];
    this.game = game;
    this.moveKeys = ['left', 'up', 'right', 'down', 'bomb'];
  }

  drawPlayer() {
    this.ctx.drawImage(this.img, this.currentPosition.x,
                       this.currentPosition.y, 44, 44);
  }

  bombAvatarCollisionDetection(bombPosition) {
    let computerPosition = this.currentPosition;
    let playerPosition = this.game.player.currentPosition;
    let leftBlastRadius = bombPosition.x - 25;
    let rightBlastRadius = bombPosition.x + 25;
    let topBlastRadius = bombPosition.y - 25;
    let bottomBlastRadius = bombPosition.y + 25;

    if (playerPosition.x > leftBlastRadius && playerPosition.x < rightBlastRadius
      && playerPosition.y > topBlastRadius && playerPosition.y < bottomBlastRadius) {
        this.player.status = 0;
    }
    if (computerPosition.x > leftBlastRadius && computerPosition.x < rightBlastRadius
      && computerPosition.y > topBlastRadius && computerPosition.y < bottomBlastRadius) {
        this.game.computer.status = 0;
    }
  }

  bombBrickCollisionDetection(bombPosition) {
    let leftBlastRadius = bombPosition.x - 50;
    let rightBlastRadius = bombPosition.x + 50;
    let topBlastRadius = bombPosition.y - 50;
    let bottomBlastRadius = bombPosition.y + 50;

    const collidedBricks = this.game.board.bricksStillStanding().filter(
      brick => brick.x > leftBlastRadius && brick.x < rightBlastRadius
    && brick.y > topBlastRadius && brick.y < bottomBlastRadius);

    collidedBricks.forEach( brick => {brick.status = 0;});
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
}

module.exports = Computer;
