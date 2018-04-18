class MovingObject {
  constructor(options) {
    this.velocity = options.velocity;
    this.position = options.position;
  }

  move(timeDelta) {
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
     let offsetX = this.velocity[0] * velocityScale;
     let offsetY = this.velocity[1] * velocityScale;

     this.position = (this.position[0] + offsetX, this.position[1] + offsetY);
  }


}

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

module.exports = MovingObject;
