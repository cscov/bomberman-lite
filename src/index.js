const Board = require("./board");
const Computer = require("./computer");

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById('my-canvas');
  const ctx = canvasEl.getContext('2d');

  const howToButton = document.getElementById('how-to');
  howToButton.addEventListener("click", toggleModal, false);
  const closeButton = document.getElementById('close');
  closeButton.addEventListener("click", toggleModal, false);
  
  const computerSprite = new Image();
  computerSprite.addEventListener("load", function() {
    const computer = new Computer(ctx, canvasEl, computerSprite);
    computer.drawPlayer();
  }, false);
  computerSprite.src = 'src/assets/orange_player.svg';

  const board = new Board(canvasEl, ctx, canvasEl.width/2, canvasEl.height-65);
  board.draw();

});

function toggleModal() {
  const modal = document.getElementsByClassName('modal')[0];
  if (modal.style.visibility === 'visible') {
    modal.style.visibility = 'hidden';
  } else {
    modal.style.visibility = 'visible';
  }
}
