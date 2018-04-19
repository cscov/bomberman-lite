class Player {
  constructor(ctx, canvas, img) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.img = img;
    this.currentPosition = {x: 0, y: 65 };
    this.status = 1;

  }

  drawPlayer() {
    this.ctx.drawImage(this.img, this.currentPosition.x, this.currentPosition.y,
    44, 44);
  }

  keyDownHandler(e) {
    let dx;
    let dy;
    if (e.key === "ArrowLeft") { // left arrow
      console.log("clicked left arrow");
      dx = -44;
      dy = 0;
    } else if (e.key === "ArrowDown") { // down arrow
      console.log("clicked down arrow");
      dx = 0;
      dy = 44;
    } else if (e.key === "ArrowUp") {
      console.log("clicked up arrow");
      dx = 0;
      dy = -44;
    } else if (e.key === "ArrowRight") {
      console.log("clicked right arrow");
      dx = 44;
      dy = 0;
    } else if (e.key === "b") {
      console.log("bombs away!");
    } else {
      dx = 0;
      dy = 0;
    }
    return this.movePlayer(dx, dy);
  }

  // keyUpHandler(e) {
  //   let dx = 0;
  //   let dy = 0;
  //
  //   return this.movePlayer(dx, dy);
  // }

  movePlayer(dx, dy) {
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

module.exports = Player;
