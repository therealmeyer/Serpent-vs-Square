# Serpent-vs-Square

### Background and Overview 
Serpent vs Square is a game based on two classic games, Snake and Block. An initial snake starts the game, as the goal is to make the snake as large as possible while trying to avoid blocks or go through the smallest amount block. Users will use arrow keys in order to control the snake to avoid obstacles. Random blocks and lines are generated for the user to avoid. Score is accumulated based on the number of blocks the snake can make it through. Snakes gain length from circles and lose length from square blocks. 

### Functionality and MVPs

Users will be able to: 

- [ ] Start, pause, and restart game
- [ ] Control the snake via arrow keys
- [ ] See leader board of high scores
- [ ] See a demo of game play

Additional:

- [ ] An about dropdown describing game play
- [ ] Randonly generate block numbers and snake dots

### Wireframes

This app will consist of a single screen with the gameplay canvas, buttons for info regarding gameplay, the leaderboard, and a demo. Arrow keys to show the controls, so that it is intuitive and easy for the user to pick up the game. And the app will also have a pause/play and restart button for playability convenience.  

![SerpentvSquare](https://s3-us-west-1.amazonaws.com/sonicstratus/serpent-vs-square.png)

### Architecture and Technologies
* Vanilla `Javascript` (structure, log, DOM Manipulation)
* `HTML5 Canvas` (Rendering)
* Webpack (bundle and serve scripts)

There will 5 scripts including the Webpack entry script
* `game.js` for rendering the canvas
* `play.js` for game logic 
* `draw.js` for drawing necessary shapes
* `start.js` for showing the startup state
* `bundle.js` for webpack entry

### Implementation Timeline

#### Over the weekend:
- [ ] Set up files (webpack) 
- [ ] Become more familiar with collisions and Canvas
- [ ] 

#### Day 1: Creating the skeleton with Canvas
- [ ] Create start canvas and basic layout of page
- [ ] Implement block and snake circle creation
- [ ] Start implementing game logic

#### Day 2: Game Logic
- [ ] Finish game logic 
- [ ] Start on collision graphics 

#### Day 3: User controls
- [ ] finish collision graphics 
- [ ] create controls for the user 
- [ ] get server running for keeping track of high scores

#### Day 4: Finishing Touches
- [ ] Implement Pause/Play/Restart
- [ ] Finishing touches and styling
- [ ] Complete info pages

### Bonus features
- [ ] User can change colors of snakes and blocks
- [ ] Advanced animations of destroying blocks
- [ ] Sharing scores 

