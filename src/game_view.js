class GameView {
  constructor(game, canvasEl, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.canvasEl = canvasEl;
    this.computer = this.game.addComputer();
    this.board = this.game.addBoard();
    this.player = this.game.addPlayer();
  }

  bindComputerHandlers() {
    const computer = this.computer;

    if (!this.computer.isComputerDead()) {
      Object.keys(GameView.MOVES).forEach( stepTaken => {
        const move = GameView.MOVES[stepTaken];
        this.computer.movePlayer(move);
      });

    }
  }

  start() {
    this.bindComputerHandlers();
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeDelta = time - this.lastTime;
    this.computer.step(timeDelta);
    this.lastTime = time;

    requestAnimationFrame(this.animate.bind(this));
  }
}

GameView.MOVES = {
  a: [-1, 0],
  b: [0, -1],
  c: [0, 1],
  d: [1, 0]
};
module.exports = GameView;
