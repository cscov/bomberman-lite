const Item = require("./items");

class Player {
  constructor(ctx, canvas, img, game) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.img = img;
    this.currentPosition = {x: 0, y: 65 };
    this.status = 1;
    this.numBombs = 1;
    this.bombs = [];
    this.game = game;
  }

  drawPlayer() {
    this.ctx.drawImage(this.img, this.currentPosition.x, this.currentPosition.y,
    44, 44);
  }

  keyDownHandler(e) {
    if (!this.game.started) {
      return;
    }
    let dx = 0;
    let dy = 0;
    let newMove = {dx: 0, dy: 0};

    if (e.key === "ArrowLeft") {
      dx = -22;
      dy = 0;
      newMove = this.walkingCollisionDetection(dx, dy);

    } else if (e.key === "ArrowDown") {
      dx = 0;
      dy = 22;
      newMove = this.walkingCollisionDetection(dx, dy);
    } else if (e.key === "ArrowUp") {
      dx = 0;
      dy = -22;
      newMove = this.walkingCollisionDetection(dx, dy);
    } else if (e.key === "ArrowRight") {
      dx = 22;
      dy = 0;
      newMove = this.walkingCollisionDetection(dx, dy);
    } else if (e.key === "b") {
      dx = 0;
      dy = 0;
      if (this.numBombs > 0) {
        this.setBomb = true;
        this.placeBomb();
      }
    } else {
      dx = 0;
      dy = 0;
    }
    dx = newMove.dx;
    dy = newMove.dy;
    return this.movePlayer(dx, dy);
  }

  movePlayer(dx, dy) {
    if (this.currentPosition.x + dx < 0 || this.currentPosition.x + 22 + dx >= this.canvas.width) {
      dx = 0;
    }
    if (this.currentPosition.y + dy < 65 || this.currentPosition.y + 44 >= this.canvas.height) {
      dy = 0;
    }
    this.currentPosition.x += dx;
    this.currentPosition.y += dy;
    return this.drawPlayer();
  }

  placeBomb() {
    const bomb = new Item(this.ctx, this, 'bomb', "#233D4D", {x: this.currentPosition.x + 15, y: this.currentPosition.y - 15});
    this.bombs.push(bomb);
    bomb.drawItem();
    window.setTimeout(bomb.detonate.bind(bomb), 3000);
  }

  bombAvatarCollisionDetection(bombPosition) {
    let playerPosition = this.currentPosition;
    let computerPosition = this.game.computer.currentPosition;
    let leftBlastRadius = bombPosition.x - 50;
    let rightBlastRadius = bombPosition.x + 50;
    let topBlastRadius = bombPosition.y - 50;
    let bottomBlastRadius = bombPosition.y + 50;

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
    if ((this.currentPosition.x + 22) + dx >= this.game.computer.currentPosition.x
        && (this.currentPosition.x + 22) + dx <= this.game.computer.currentPosition.x + 22
        && (this.currentPosition.y + 22) + dy >= this.game.computer.currentPosition.y
        && (this.currentPosition.y + 22) + dy <= this.game.computer.currentPosition.y + 22) {
      return { dx: 0, dy: 0};
    }

    return { dx, dy };
  }
}

module.exports = Player;
