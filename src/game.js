const Board = require("./board");
const Computer = require("./computer");
const Player = require("./player");

class Game {
  constructor(canvasEl, ctx) {
    this.canvasEl = canvasEl;
    this.ctx = ctx;
    this.board = [];
    this.computer = [];
    this.player = [];
  }

  add(obj) {
    if (obj instanceof Board) {
      this.board.push(obj);
    } else if (obj instanceof Computer) {
      this.computer.push(obj);
    } else if (obj instanceof Player) {
      this.player.push(obj);
    }
  }

  addBoard() {
    const board = new Board({
      canvasEl: this.canvasEl,
      ctx: this.ctx,
      width: this.canvasEl.width,
      height: this.canvasEl.height-65
    });
    this.add(board);

    board.draw();

    return board;
  }

  addComputer() {
    const computerSprite = new Image();
    const computer = new Computer({
      ctx: this.ctx,
      canvasEl: this.canvasEl,
      img: computerSprite,
      board: this.board,
      velocity: [0,0],

    });

    this.add(computer);

    computerSprite.addEventListener("load", function() {
      computer.drawPlayer();
    }, false);
    computerSprite.src = 'src/assets/orange_player.svg';

    return computer;
  }

  addPlayer() {
    const playerSprite = new Image();
    const player = new Player({
      ctx: this.ctx,
      canvasEl: this.canvasEl,
      img: playerSprite,
      board: this.board
    });

    this.add(player);

    playerSprite.addEventListener("load", function() {
      player.drawPlayer();
    }, false);
    playerSprite.src = 'src/assets/navy_blue_player.svg';

    return player;
  }

  allObjects() {
    return [].concat(this.board, this.computer, this.player);
  }
}

module.exports = Game;
