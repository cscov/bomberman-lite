# README - Bomberman Lite

## Background and Overview

Bomberman Lite is based on the classic Super Nintendo game *Bomberman 2*. In that game, there is both a single-player mode that is a kind of quest mode and a multi-player mode where you can play against your friends and/or the computer. Due to the amount of time set aside for this project, my implementation focuses on a modified version of multiplayer mode where a single player will play against a computer player.

In this game, the objective is to blow up your opponent. You start out on opposite sides of a room, which also is partially blocked off by obstacles. Players can use their bombs to blow up the obstacles to eventually get close enough to hit their opponent.

Players only have one life and start out with being able to place a single bomb. They must wait for that bomb to detonate before they are able to place another bomb. As the bombs detonate after a certain number of seconds and have a certain blast radius, players must be careful not to stand too close to their own bombs when they detonate.

Through blowing up obstacles, players can also discover power-up items, such as the ability to run faster, place more bombs at once, or have a larger blast radius.

## Functionality and MVPs
### User Features
In Bomberman Lite, users will be able to:
- [ ] enter their name for the scoreboard
- [ ] start out placing a single bomb
- [ ] use bombs to blow up obstacles
- [ ] use bombs to hit the computer opponent
- [ ] discover  the following randomly placed power-up items:
  - [ ] skates that increase the speed at which a player is able to move
  - [ ] fireballs that increase their blast radius
  - [ ] bomb icons that increase the number of bombs they can place at a time


### Gameplay
When the game starts, the board is set with obstacles and items randomly placed. The game is over when one player is killed by another. When the game resets, the placement of obstacles and items also resets.

### Computer AI
The computer player will be able to:
- [ ] move about in a random pattern
- [ ] use power-up items
- [ ] detect bombs and move away from them when possible
- [ ] place bombs

### Instructions
In addition to gameplay, users will also be able to:
- [ ] read instructions on gameplay through a modal
- [ ] click a 'start' button to start the game or reset it when the game is over

## Wireframes
This app will consist of a single screen with the simulation canvas,
user avatar and name, computer avatar, link to the github, and 'how to play' modal button.
The user's avatar will be rendered in blue, while the computer avatar will be rendered in red.

## Architecture and Technologies
This project will be implemented with the following technologies:

- [ ] Vanilla JavaScript for overall structure and game logic,
- [ ] HTML5 Canvas for DOM manipulation and rendering,
- [ ] Webpack to bundle and serve up the various scripts.

In addition to the webpack entry file, there will be four scripts involved in this project:
- `player.js` that will hold the logic for how the player moves and places bombs
- `computer.js` that will hold the logic for how the computer moves and places bombs
- `items.js` that will hold the logic for the power-up items and bombs
- `board.js` that will hold the logic for the board rendering and game-over scenario

## Implementation Timeline
### Over the weekend
- [x] Completed MDN Breakout game tutorial
- [x] started to set up webpack and entry file

### Day 1
Setup all necessary Node modules, including getting webpack up and running. Create `webpack.config.js` as well as `package.json`. Write a basic entry file and the bare bones of all 4 scripts outlined above.
Goals for the day:
- [ ] Get webpack serving files and frame out index.html
- [ ] Create board rendering logic of randomly placed obstacles
- [ ] Create 'how to play' modal

### Day 2
- [ ] Get computer player logic done, as it will be easier to extrapolate single player logic from the computer
- [ ] Get bomb logic done
- [ ] Get player logic done

### Day 3
- [ ] Start item logic
  - [ ] roller skates
  - [ ] fireballs
  - [ ] extra bombs

### Day 4
- [ ] Finish item logic
- [ ] Make sure the board, item, and player aesthetics are pleasing
- [ ] If time, bonus features

## Bonus features
- [ ] gloves for throwing bombs
- [ ] A timer feature that starts placing obstacles back on the board after a certain amount of time has passed, until one of the players kills the other or is crushed by an obstacle
- [ ] sound effects for bomb detonation and item grabbing
- [ ] best 2 out of three scoring system
- [ ] changing avatar color
