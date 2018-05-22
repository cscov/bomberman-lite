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
}

module.exports = Computer;
