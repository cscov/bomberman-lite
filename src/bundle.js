/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

class Player {
  constructor(options) {
    this.ctx = options.ctx;
    this. canvas = options.canvas;
    this.img = options.img;
    this.startPosition = { x: 0, y: 65 };
  }

  drawPlayer() {
    this.ctx.drawImage(this.img, this.startPosition.x, this.startPosition.y,
                       44, 44);
  }
}

module.exports = Player;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class Board {
  constructor(options) {
    this.ctx = options.ctx;
    this.x = options.width;
    this.y = options.height;
    this.canvas = options.canvasEl;
    this.brickColumnCount = 25;
    this.brickRowCount = 12;
    this.brickWidth = 44;
    this.brickHeight = 44;
  }

  drawBricks() {
    const brickOffsetLeft = 44;
    const brickOffsetTop = 65;
    const brickPadding = 44;

    const bricks = [];
    for (let c = 0; c < this.brickColumnCount; c++) {
      bricks[c] = [];
      for (let r = 0; r < this.brickRowCount; r++) {
        if (c % 5 === 0) {
          bricks[c][r] = { x: 0, y: 0, status: 2 };
          this.ctx.fillStyle = "#F1F7ED";
        } else {
          let displayBrick = Math.floor(Math.random() * 2);
          bricks[c][r] = { x: 0, y: 0, status: displayBrick};
          this.ctx.fillStyle = "#A4243B";
        }
        if (bricks[c][r].status === 2 || bricks[c][r].status === 1) {
          let brickX = (c * (this.brickWidth + brickPadding)) + brickOffsetLeft;
          let brickY = (r * (this.brickHeight + brickPadding)) + brickOffsetTop;
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;

          this.ctx.beginPath();
          this.ctx.rect(brickX, brickY, this.brickWidth, this.brickHeight);
          this.ctx.fill();
          this.ctx.closePath();
        }
      }
    }
  }

  getBrickColumnCount(){
    return this.brickColumnCount;
  }

  getBrickRowCount() {
    return this.brickRowCount;
  }

  getBrickWidth() {
    return this.brickWidth;
  }

  getBrickHeight() {
    return this.brickHeight;
  }


  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawBricks();
  }
}

module.exports = Board;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(7);

class Computer extends MovingObject {
  constructor(options) {
    super(options);
    options.velocity = options.velocity || [1, 0];
    options.position = options.position;
    this.ctx = options.ctx;
    this.canvas = options.canvasEl;
    this.img = options.img;
    this.board = options.board;
    this.position = { x: options.canvasEl.width - 44, y: options.canvasEl.height - 44};
    this.startPosition = { x: options.canvasEl.width - 44, y: options.canvasEl.height - 44, status: 1 };
    this.dx = 2;
    this.dy = -2;
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


/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const GameView = __webpack_require__(6);
const Game = __webpack_require__(5);

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById('my-canvas');
  const ctx = canvasEl.getContext('2d');

  const howToButton = document.getElementById('how-to');
  howToButton.addEventListener("click", toggleModal, false);
  const closeButton = document.getElementById('close');
  closeButton.addEventListener("click", toggleModal, false);

  const game = new Game(canvasEl, ctx);
  new GameView(game, canvasEl, ctx).start();
});

function toggleModal() {
  const modal = document.getElementsByClassName('modal')[0];
  if (modal.style.visibility === 'visible') {
    modal.style.visibility = 'hidden';
  } else {
    modal.style.visibility = 'visible';
  }
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Board = __webpack_require__(1);
const Computer = __webpack_require__(2);
const Player = __webpack_require__(0);

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


/***/ }),
/* 6 */
/***/ (function(module, exports) {

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


/***/ }),
/* 7 */
/***/ (function(module, exports) {

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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map