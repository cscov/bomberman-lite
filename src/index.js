const Board = require("./board");
const Computer = require("./computer");
const Player = require("./player");
const Game = require("./game");

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
