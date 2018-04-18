class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.computer = this.game.addComputer();
  }

  bindComputerHandlers() {
    const computer = this.computer;

    while (!this.computer.isComputerDead()) {
      Object.keys(GameView.MOVES).forEach( stepTaken => {
        const move = GameView.MOVES[stepTaken];
        this.computer.movePlayer(move);
      });

    }
  }

  start() {
    this.bindComputerHandlers();
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this.computer));
  }

  animate(time) {
    const timeDelta = time - this.lastTime;
    this.game.step(timeDelta);
    this.lastTime = time;

    requestAnimationFrame(this.animate.bind(this.computer));
  }
}

GameView.MOVES = {
  a: [-1, 0],
  b: [0, -1],
  c: [0, 1],
  d: [1, 0]
};
module.exports = GameView;
