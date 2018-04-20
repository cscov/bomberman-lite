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
/***/ (function(module, exports, __webpack_require__) {


const Bomb = __webpack_require__(3);

class Player {
  constructor(ctx, canvas, img, game) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.img = img;
    this.position = {x: 0, y: 65 };
    this.status = 1;
    this.numBombs = 1;
    this.game = game;
    this.width = 44;
    this.height = 44;
  }

  drawPlayer() {
    this.ctx.drawImage(this.img, this.position.x, this.position.y,
    44, 44);
  }

  keyDownHandler(e) {
    if (!this.game.started) {
      return;
    }
    let dx;
    let dy;
    if (e.key === "ArrowLeft") { // left arrow
      dx = -22;
      dy = 0;
    } else if (e.key === "ArrowDown") { // down arrow
      dx = 0;
      dy = 22;
    } else if (e.key === "ArrowUp") {
      dx = 0;
      dy = -22;
    } else if (e.key === "ArrowRight") {
      dx = 22;
      dy = 0;
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
    return this.movePlayer(dx, dy);
  }

  movePlayer(dx, dy) {
    if (this.position.x + dx < 0 || this.position.x + dx >= this.canvas.width
    || this.position.x + this.width >= this.canvas.width) {
      dx = 0;
    }
    if (this.position.y + dy < 65 || this.position.y + dy >= this.canvas.height
    || this.position.y + this.height >= this.canvas.height) {
      dy = 0;
    }
    this.position.x += dx;
    this.position.y += dy;
    return this.drawPlayer();
  }

  placeBomb() {
    this.numBombs -= 1;
    const bomb = new Bomb(this.ctx, this, 'bomb', "#233D4D", {x: this.position.x + 15, y: this.position.y}, this.game);
    this.game.bombs.push(bomb);
    bomb.drawItem();
    window.setTimeout(bomb.detonate.bind(bomb), 3000);
  }
}

module.exports = Player;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class Board {
  constructor(canvasEl, ctx, width, height) {
    this.ctx = ctx;
    this.x = width;
    this.y = height;
    this.canvas = canvasEl;
    this.brickColumnCount = 25;
    this.brickRowCount = 12;
    this.brickWidth = 44;
    this.brickHeight = 44;
  }

  initializeBricks() {
    this.brickColumnCount = 25;
    this.brickRowCount = 12;
    const brickWidth = 44;
    const brickHeight = 44;
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
          let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
          let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;

          this.ctx.beginPath();
          this.ctx.rect(brickX, brickY, brickWidth, brickHeight);
          this.ctx.fill();
          this.ctx.closePath();
        }
      }
    }
    this.bricks = bricks;
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
          let displayBrick = this.bricks[c][r].status;
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
    this.drawBricks();
  }

  getBricks() {
    return this.bricks;
  }

  getColumnCount() {
    return this.brickColumnCount;
  }

  getRowCount() {
    return this.brickRowCount;
  }
}

module.exports = Board;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Bomb = __webpack_require__(3);

class Computer {
  constructor(ctx, canvas, img, game) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.img = img;
    this.position = { x: canvas.width - 44, y: canvas.height - 44 };
    this.status = 1;
    this.numBombs = 1;
    this.game = game;
  }
  drawPlayer() {
    this.ctx.drawImage(this.img, this.position.x,
                       this.position.y, 44, 44);
    
  }

  movePlayer() {
    if (!this.game.started) {
      return;
    }
    let randomMove = Math.floor(Math.random() * 4);
    let move = MOVES[randomMove];
    let dx = move[0];
    let dy = move[1];

    if (this.position.x + dx < 0 || this.position.x + dx >= this.canvas.width
    || this.position.x + this.width >= this.canvas.width) {
      dx = 0;
    }
    if (this.position.y + dy < 65 || this.position.y + dy >= this.canvas.height
    || this.position.y + this.height >= this.canvas.height) {
      dy = 0;
    }
    this.position.x += dx;
    this.position.y += dy;
    this.placeBomb();

    return this.drawPlayer();
  }

  placeBomb() {
    if (this.numBombs === 0) {
      return;
    }
    this.numBombs -= 1;
    const bomb = new Bomb(this.ctx, this, 'bomb', "#233D4D", {x: this.position.x + 15, y: this.position.y}, this.game);
    this.game.bombs.push(bomb);
    bomb.drawItem();
    window.setTimeout(bomb.detonate.bind(bomb), 3000);
  }
}

const MOVES = [
  [22, 0],
  [-22, 0],
  [0, 22],
  [0, -22]
];

module.exports = Computer;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Player = __webpack_require__(0);

class Bomb {
  constructor(ctx, player, type, color, position, game) {
    this.ctx = ctx;
    this.player = player;
    this.type = type;
    this.status = 1;
    this.color = color;
    this.position = {x: position.x, y: position.y};
    this.blastRadius = 50;
    this.game = game;
  }

  drawItem() {
    if (this.type === 'bomb') {
      this.ctx.beginPath();
      this.ctx.arc(this.position.x, this.position.y, 15, 0, Math.PI*2);
      this.ctx.fillStyle = this.color;
      this.ctx.fill();
      this.ctx.closePath();
    }
  }

  isCollidedWith(otherObj) {
    let leftX = this.position.x - this.blastRadius;
    let rightX = this.position.x + this.blastRadius;
    let upY = this.position.y + this.blastRadius;
    let downY = this.position.y - this.blastRadius;

    if (otherObj.position.x > leftX && otherObj.position.x < this.position.x) {
      return true;
    }
    if (otherObj.position.x > this.position.x && otherObj.position.x < rightX) {
      return true;
    }
    if (otherObj.position.y > this.position.y && otherObj.position.y < upY) {
      return true;
    }
    if (otherObj.position.y < this.position.y && otherObj.position.y > downY) {
      return true;
    }
    return false;
  }

  detonate() {
    this.status = 3;
  }


  drawExplosion() {
    this.ctx.beginPath();
    this.ctx.arc(this.position.x, this.position.y, 50, 0, Math.PI*2);
    this.ctx.fillStyle = "#233D4D";
    this.ctx.fill();
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.arc(this.position.x, this.position.y, 40, 0, Math.PI*2);
    this.ctx.fillStyle = "#64a7d1";
    this.ctx.fill();
    this.ctx.closePath();

    this.player.numBombs += 1;
    this.player.setBomb = false;

    this.game.remove(this);

  }
}

module.exports = Bomb;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {


const Board = __webpack_require__(1);
const Computer = __webpack_require__(2);
const Player = __webpack_require__(0);
const GameView = __webpack_require__(6);
const Game = __webpack_require__(5);

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById('my-canvas');
  const ctx = canvasEl.getContext('2d');

  const howToButton = document.getElementById('how-to');
  howToButton.addEventListener("click", toggleModal, false);
  const closeButton = document.getElementById('close');
  closeButton.addEventListener("click", toggleModal, false);

  const board = new Board(canvasEl, ctx, canvasEl.width/2, canvasEl.height-65);
  board.initializeBricks();



  const computerSprite = new Image();
  const computer = new Computer(ctx, canvasEl, computerSprite);
  computerSprite.addEventListener("load", function() {
    computer.drawPlayer();
  }, false);
  computerSprite.src = 'src/assets/orange_player.svg';

  const playerSprite = new Image();
  const player = new Player(ctx, canvasEl, playerSprite);
  playerSprite.addEventListener("load", function () {
    player.movePlayer.bind(player);
    player.drawPlayer();
  }, false);
  playerSprite.src = 'src/assets/navy_blue_player.svg';

  document.addEventListener("keydown", function (e) {
    player.keyDownHandler(e);
  }, true);

  const game = new Game(board, computer, player, canvasEl, ctx);
  const startButton = document.getElementById('start');
  startButton.addEventListener("click", function () {
    game.start.bind(this);
    game.start();
  }, false);

  player.game = game;
  computer.game = game;

  const play = document.getElementsByClassName('play-again')[0]; // lost
  play.addEventListener("click", function () {
    const lost = document.getElementById('lost');
    lost.classList.remove('show');

    game.start.bind(this);
    game.start();
  }, false);

  const play2 = document.getElementsByClassName('play-again')[1]; // won
  play2.addEventListener("click", function () {
    const won = document.getElementById('won');
    won.classList.remove('show');
    game.start.bind(this);
    game.start();
  }, false);

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

const Bomb = __webpack_require__(3);

class Game {
  constructor(board, computer, player, canvas, ctx, item) {
    this.board = board;
    this.computer = computer;
    this.player = player;
    this.canvas = canvas;
    this.ctx = ctx;
    this.items = [];
    this.bombs = [];
    this.avatars = [this.player, this.computer];
    this.draw = this.draw.bind(this);
  }

  allObjects() {
    return [].concat(this.items, this.bombs, this.avatars, this.board.getBricks());
  }

  draw(timestamp) {
    let start = timestamp;
    let progress = timestamp - start;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.board.draw();
    this.computer.drawPlayer();
    this.player.drawPlayer();
    if (this.player.setBomb) {
      this.bombs.forEach( bomb => {
        if (bomb.status === 1) {
          bomb.drawItem();
          window.setTimeout(bomb.detonate.bind(bomb), 3000);
          bomb.status = 2;
        } else if (bomb.status === 2) {
          bomb.drawItem();
        } else if (bomb.status === 3) {
          bomb.drawExplosion();
          this.collisionDetection();

        }
      });
    }
    if (!this.gameOver()) {
      window.requestAnimationFrame(this.draw);
    } else {
      this.displayEndMessage();
    }
  }

  start() {
    this.started = true;
    this.player.status = 1;
    this.computer.status = 1;
    const gameCover = document.getElementById('game-start-cover');
    if (gameCover.style.visibility === 'hidden') {
      gameCover.style.visibility = 'visible';
    } else {
      gameCover.style.visibility = 'hidden';
    }
    window.requestAnimationFrame(this.draw);
  }

  collisionDetection() {
    const allObjects = this.allObjects().filter( obj => obj.status > 0);
    for (let i = 0; i < allObjects.length; i++) {
      for (let j = i + 1; j < allObjects.length; j++) {
        const obj1 = allObjects[i];
        const obj2 = allObjects[j];
        if (obj1 instanceof Bomb && obj1.isCollidedWith(obj2)) {
          obj2.status = 0;
        } else if (obj2 instanceof Bomb && obj1.isCollidedWith(obj2)) {
          obj1.status = 0;
        } else {
          return;
        }
      }
    }
  }

  remove(obj) {
    if (obj instanceof Bomb) {
      this.bombs.splice(this.bombs.indexOf(obj), 1);
    } else if (obj instanceof Board) {
      this.board.getBricks().splice(this.board.getBricks().indexOf(obj), 1);
    }
  }

  gameOver() {
    return this.player.status === 0 || this.computer.status === 0;
  }

  displayEndMessage() {
    if (this.player.status === 0) {
      const modal = document.getElementById('lost');
      modal.classList.add('show');
    } else {
      const modal = document.getElementById('won');
      modal.classList.add('show');
    }
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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map