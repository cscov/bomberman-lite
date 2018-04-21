# README - Bomberman Lite

## Background and Overview

Bomberman Lite is based on the classic Super Nintendo game *Bomberman 2*. In that game, there is both a single-player mode that is a kind of quest mode and a multi-player mode where you can play against your friends and/or the computer. Due to the amount of time set aside for this project, my implementation focuses on a modified version of multiplayer mode where a single player will play against a computer player.

In this game, the objective is to blow up your opponent. You start out on opposite sides of a room, which also is partially blocked off by obstacles. Players can use their bombs to blow up the obstacles to eventually get close enough to hit their opponent.

Players only have one life and start out with being able to place a single bomb. They must wait for that bomb to detonate before they are able to place another bomb. As the bombs detonate after a certain number of seconds and have a certain blast radius, players must be careful not to stand too close to their own bombs when they detonate.


## Functionality and MVPs
### User Features
In Bomberman Lite, users will be able to:
- [x] start out placing a single bomb
- [x] use bombs to blow up obstacles
- [x] use bombs to hit the computer opponent


### Gameplay
When the game starts, the board is set with obstacles and items randomly placed. The game is over when one player is killed by another. When the game resets, the placement of obstacles also resets.

### Computer AI
The computer player will be able to:
- [x] move about in a random pattern
- [x] detect bombs and move away from them when possible
- [x] place bombs

### Instructions
In addition to gameplay, users will also be able to:
- [x] read instructions on gameplay through a modal
- [x] click a 'start' button to start the game or reset it when the game is over

## Wireframes
This app consists of a single screen with the simulation canvas,
user avatar and name, computer avatar, link to the github, and 'how to play' modal button.

![board wireframe](https://github.com/cscov/bomberman-lite/blob/master/images/home.png)

## Architecture and Technologies
This project was implemented with the following technologies:

- [x] Vanilla JavaScript for overall structure and game logic,
- [x] HTML5 Canvas for DOM manipulation and rendering,
- [x] Webpack to bundle and serve up the various scripts.

In addition to the webpack entry file(`index.js`), there are be five scripts involved in this project:
- `player.js` that will hold the logic for how the player moves and places bombs
- `computer.js` that will hold the logic for how the computer moves and places bombs
- `bomb.js` that will hold the logic for the power-up items and bombs
- `board.js` that will hold the logic for the board rendering and game-over scenario
- `game.js` that holds the logic for starting and ending the game, collision detection, and rendering each object on the screen

## Feature of Note
### Randomly Generated Levels
Each time the player starts a new game, the pattern of obstacles in the game randomly generates, allowing for endless returns to the game. In order to implement this feature, I generated obstacles through conditional logic.

```js

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
          ```

 ![screenshot](https://github.com/cscov/bomberman-lite/blob/master/images/bomberman_lite_screenshot.png)

## Future Directions
- [ ] Power-up items
  - [ ] fireballs that increase your blast radius
  - [ ] roller skates that increase your speed
  - [ ] the ability to place more than one bomb at a time
  - [ ] gloves for throwing bombs
- [ ] A timer feature that starts placing obstacles back on the board after a certain amount of time has passed, until one of the players kills the other or is crushed by an obstacle
- [ ] sound effects for bomb detonation and item grabbing
- [ ] best 2 out of three scoring system
- [ ] changing avatar color
