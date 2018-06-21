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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/serp-v-square.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/block.js":
/*!**********************!*\
  !*** ./lib/block.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(/*! ./moving_object */ "./lib/moving_object.js");
const Util = __webpack_require__(/*! ./util */ "./lib/util.js");

class Block extends MovingObject {
  constructor(options = {}) {
    options.color = 'green';
    // options.pos = [10,5];
    options.radius = 38;
    options.vel = [0, 1];
    super(options);
    this.value = options.val;
    this.color = this.getColor(this.value);
  }

  getColor(value) {
    if (value === 1) {
      return '#69F0AE';
    } else if (value <= 4) {
      return '#00E676';
    } else if (value <= 8) {
      return '#00C853';
    } else if (value <= 12) {
      return '#FFD54F';
    } else if (value <= 16) {
      return '#FFCA28';
    } else if (value <= 20) {
      return '#FF8F00';
    } else if (value >= 21) {
      return '#D84315';
    }
  }

  draw(ctx) {
    Util.drawBlock(ctx, this.pos[0], this.pos[1], 77, this.color);
    if (this.value > 9) {
      Util.drawText(ctx, this.pos[0]-23, this.pos[1]+20, 50, 'black', this.value);
    } else {
      Util.drawText(ctx, this.pos[0]-13, this.pos[1]+20, 50, 'black', this.value);
    }

  } 

}

module.exports = Block;

/***/ }),

/***/ "./lib/circle.js":
/*!***********************!*\
  !*** ./lib/circle.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(/*! ./util */ "./lib/util.js");
const MovingObject = __webpack_require__(/*! ./moving_object */ "./lib/moving_object.js");

class Circle extends MovingObject {
  constructor(options = {}) {
    options.color = 'yellow';
    options.pos = options.pos; //|| options.game.randomPos();
    options.radius = 10;
    options.vel = [0, 1];
    super(options);
    this.value = this.randomValue();
  }

  randomValue() {
    return Math.floor(Math.random() * 6) + 1;
  }

  draw(ctx) {
    Util.drawText(ctx, this.pos[0], this.pos[1]-15, 12, this.color, this.value);
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, Math.PI * 2, true);
    ctx.fill();
    
    // Util.drawCircle(ctx, this.pos[0], this.pos[1], this.radius, this.color);

  }

}

module.exports = Circle;

/***/ }),

/***/ "./lib/game.js":
/*!*********************!*\
  !*** ./lib/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Line = __webpack_require__(/*! ./line */ "./lib/line.js");
const Score = __webpack_require__(/*! ./score */ "./lib/score.js");
const Serpent = __webpack_require__(/*! ./serpent */ "./lib/serpent.js");
const Block = __webpack_require__(/*! ./block */ "./lib/block.js");
const Circle = __webpack_require__(/*! ./circle */ "./lib/circle.js");
const Util = __webpack_require__(/*! ./util */ "./lib/util.js");

class Game {
  constructor() {
    this.circles = [];
    this.blocks = [];
    this.serpents = [];
    this.lines = [];
    this.score = 0;
    
    this.addBlocks();
    this.addCircles();
    this.addLines();
    this.addBlocks = this.addBlocks.bind(this);
    this.addCircles = this.addCircles.bind(this);
    this.addLines = this.addLines.bind(this);
    setInterval(this.addBlocks, 4500);
    setInterval(this.addCircles, 4500);
    setInterval(this.addLines, 4500);
  }

  addSerpent() {
    const serpent = new Serpent({ pos: [200, 625], game: this });
    this.add(serpent);
    this.serpent = serpent;
    return serpent;
  }

  addBlocks() {
    // debugger;
    const margin = 3;
    const blockSize = 78;
    const serpLength = this.serpent ? this.serpent.length : 5;
    for (let i = 0; i < 5; i++) {
      const randVal = Math.floor((Math.random() * serpLength+2) + 1);
      let x;
      if (i === 0 ) {
        x = margin + 40;
      } else {
        x = margin + (blockSize * i) + 40;
      }
      this.add(new Block({
        game: this,
        pos: [x, -1],
        val: randVal
      }));
    }



    // const margin = 3;
    // const blockSize = 98;
    // const serpLength = this.serpent ? this.serpent.length : 5;
    // for (let i = 0; i < 4; i++) {
    //   const randVal = Math.floor((Math.random() * serpLength+3) + 1);
    //   let x;
    //   if (i === 0 ) {
    //     x = margin + 50;
    //   } else {
    //     x = margin + (blockSize * i) + 50;
    //   }
    //   this.add(new Block({
    //     game: this,
    //     pos: [x, -1],
    //     val: randVal
    //   }));
    // }
  }

  addCircles() {
    const possibleCircs = [40, 90, 140, 170, 185, 
      210, 250, 280, 310, 340, 370];
    const possY = [100, 150, 180, 200];
    const randomX = possibleCircs.sort(function () {
      return 0.5 - Math.random();
    });
    const randomY = possY.sort(function () {
      return 0.5 - Math.random();
    });

    const numCircles = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < numCircles; i++) {
      // const posX = possibleCircs[Math.floor(Math.random() * possibleCircs.length)];
      // const posX = Math.floor(Math.random() * 250) + 100;
      this.add(new Circle({
        game: this,
        pos: [randomX[i], randomY[i]]
      }));
    }
  }

  // addScore() {
  //   this.add(new Score({game: this}));
  // }

  addLines() {
    // const lines = [];
    // const posY = [42, ]
    const possibleLines = [82, 161, 240, 320];
    const random = possibleLines.sort(function () {
      return 0.5 - Math.random();
    });
    const numLines = Math.floor(Math.random() * 4);
    for (let i = 0; i < numLines; i++) {
      // const placeX = possibleLines[Math.floor(Math.random() * possibleLines.length)];
      
      this.add(new Line({game: this, pos: [random[i], 42]}));
    }

  }

  add(object) {
    if (object instanceof Block) {
      this.blocks.push(object);
    } else if (object instanceof Circle) {
      this.circles.push(object);
    } else if (object instanceof Serpent) {
      this.serpents.push(object);
    } else if (object instanceof Score) {
      this.serpents.push(object);
    } else if (object instanceof Line) {
      this.lines.push(object);
    }
  }

  draw(ctx) {
    ctx.clearRect(0,0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    ctx.font = 'normal 25px Montserrat';
    ctx.fillStyle = 'white';
    ctx.fillText(this.score, 350, 240);

    this.allObjects().forEach((object) => {
      object.draw(ctx);
    });
  }

  isOutOfBounds(pos) {
     return (pos[0] < 0) || (pos[1] < 0) ||
       (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
  }

  moveObjects(delta) {
    this.allObjects().forEach((object) => {
      object.move(delta);
    });
  }

  remove(object) {
    if (object instanceof Block) {
      this.blocks.splice(this.blocks.indexOf(object), 1);
    } else if (object instanceof Circle) {
      this.circles.splice(this.circles.indexOf(object), 1);
    }
  }
  step(delta) {
    this.moveObjects(delta);
    this.checkCollisions();
  }

  allObjects() {
    return [].concat(this.blocks, this.circles, this.serpents, this.lines);
  }

  checkCollisions() {
    const allObjects = [].concat(this.blocks, this.circles, this.lines);
    for (let i = 0; i < allObjects.length; i++) {
      const obj = allObjects[i];
      if (this.serpent.isCollidedWith(obj)) {
        const collision = this.serpent.collideWith(obj);
        this.score += collision;
        if (collision) return;
      }
    }
  }
}

Game.BG_COLOR = "#000000";
Game.DIM_X = 400;
Game.DIM_Y = 850;
Game.FPS = 60;

module.exports = Game;

/***/ }),

/***/ "./lib/game_view.js":
/*!**************************!*\
  !*** ./lib/game_view.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

const keyCodes = {
  left: [-3, 0],
  right: [3, 0]
};

const pauseButton = document.getElementById("pausebtn");
// console.log(pauseButton);

class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.serpent = this.game.addSerpent();
    this.keys = Object.create(null);
    // window.addEventListener('keydown', this.bindKeyHandlers);
    this.gameStarted = false;
    // console.log(pauseButton);
    this.paused = false;
    pauseButton.addEventListener('click', this.togglePlay.bind(this));

    window.addEventListener('keyup', this.resetSerp.bind(this));
    this.resetSerp = this.resetSerp.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
  }

  bindKeyHandlers() {
    // if (!e) return;
    const serpent = this.serpent;
    Object.keys(keyCodes).forEach((k) => {
      const move = keyCodes[k];
      key(k, () => { serpent.power(move); });
    });
    // debugger;
    // if (keyCodes.hasOwnProperty(e.keyCode)) {
    //   e.preventDefault();
    //   serpent.power(keyCodes[e.keyCode]);
    // }

  }

  togglePlay() {
    debugger;
    if (!this.gameStarted) {
      return;
    }
    this.paused = !this.paused;
    if (!this.paused) {
      this.animate(this.lastTime-100);
    }
  }

  resetSerp() {
    // debugger;
    this.serpent.resetVel();
  }

  restart() {

  }

  start() {
    this.gameStarted = true;
    if (!this.paused) {
      this.bindKeyHandlers();
      this.lastTime = 0;
      requestAnimationFrame(this.animate.bind(this));
    } 
  }

  animate(time) {
    if (this.serpent.length <= 0) {
      this.ctx.globalAlpha = 0.6;
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(0, 0, 400, 850);
      this.ctx.globalAlpha = 1.0;
      this.ctx.font = 'normal 35px Montserrat';
      this.ctx.fillStyle = 'white';
      this.ctx.fillText('Game Over', 110, 500);
      this.ctx.font = 'normal 35px Montserrat';
      this.ctx.fillStyle = 'white';
      this.ctx.fillText(`Your Score: ${this.game.score}`, 90, 550);
      // this.ctx.font = 'normal 30px FontAwesome';
      // this.ctx.fillStyle = 'white';
      // this.ctx.fillText('\uf521', 110, 450);
    }
    else if (!this.paused) {
      const timeDelta = time - this.lastTime;
      this.game.step(timeDelta);
      this.game.draw(this.ctx);
      this.lastTime = time;

      requestAnimationFrame(this.animate.bind(this));
    }
  }
}




module.exports = GameView;

/***/ }),

/***/ "./lib/line.js":
/*!*********************!*\
  !*** ./lib/line.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(/*! ./util */ "./lib/util.js");
const MovingObject = __webpack_require__(/*! ./moving_object */ "./lib/moving_object.js");

class Line extends MovingObject {
  constructor(options = {}) {
    options.color = 'white';
    options.pos = options.pos;
    options.vel = [0, 1];
    super(options);
    this.length = 90;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.pos[0], this.pos[1]);
    ctx.lineTo(this.pos[0], this.pos[1]+this.length);
    ctx.lineWidth = 5;
    ctx.strokeStyle = this.color;
    ctx.lineCap = 'round';
    ctx.stroke();
  }

}

module.exports = Line;

/***/ }),

/***/ "./lib/moving_object.js":
/*!******************************!*\
  !*** ./lib/moving_object.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(/*! ./util */ "./lib/util.js");

class MovingObject {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;

  }

  draw(ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);
    ctx.fill();
  }

  isCollidedWith(otherObject) {
    // console.log(otherObject.constructor.name);
    // if (otherObject.constructor.name === 'Block') {
    //   // debugger;
    //   let blockWidth = otherObject.pos[0] + 48;
    //   let blockLength = otherObject.pos[1] + 97;
    //   if (this.pos[1] + this.radius === blockLength && 
    //     this.pos[0] + this.radius < blockWidth && 
    //     this.pos[0] + this.radius > otherObject.pos[0]) {
        
    //     return true;
    //   }
    //   else {
    //     return false;
    //   }
    // }
    if (otherObject.constructor.name === 'Line') {
      // debugger;
      if (((this.pos[0] + this.radius < otherObject.pos[0] +2
        && this.pos[0] + this.radius > otherObject.pos[0] -1)
        || 
        (this.pos[0] - this.radius < otherObject.pos[0] +2 &&
        this.pos[0] - this.radius > otherObject.pos[0] -1))
        && 
        (this.pos[1] > otherObject.pos[1] && 
        this.pos[1] < otherObject.pos[1] + otherObject.length + 20)) {
          // debugger;
        return true;
      } else {
        return false;
      }
    }
    const centerDist = Util.dist(this.pos, otherObject.pos);
    return centerDist < (this.radius + otherObject.radius);
  }

  move(timeDelta) {
    // timeDelta is number of milliseconds since last move
    // if the computer is busy the time delta will be larger
    // in this case the MovingObject should move farther in this frame
    // velocity of object is how far it should move in 1/60th of a second
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
      offsetX = this.vel[0] * velocityScale,
      offsetY = this.vel[1] * velocityScale;

    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];

    if (this.game.isOutOfBounds(this.pos)) {
      this.remove();
    }
  }

  remove() {
    this.game.remove(this);
  }

}

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

module.exports = MovingObject;

/***/ }),

/***/ "./lib/score.js":
/*!**********************!*\
  !*** ./lib/score.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(/*! ./util */ "./lib/util.js");
const MovingObject = __webpack_require__(/*! ./moving_object */ "./lib/moving_object.js");

class Score extends MovingObject {
  constructor(options = {}) {
    options.vel = [0,0]
    options.pos = [370, 10]
    super(options);
    this.score = 0;
    // debugger;
  }

  increment(num) {
    this.score += num;
  }

  draw(ctx) {
    // debugger;
    Util.drawText(ctx, 370, 10, 'white', this.score);
  }
}

module.exports = Score;

/***/ }),

/***/ "./lib/serp-v-square.js":
/*!******************************!*\
  !*** ./lib/serp-v-square.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(/*! ./game */ "./lib/game.js");
const GameView = __webpack_require__(/*! ./game_view */ "./lib/game_view.js");
const Util = __webpack_require__(/*! ./util */ "./lib/util.js");

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("game-canvas");
  canvasEl.width = 400;
  canvasEl.height = 850;

  const ctx = canvasEl.getContext("2d");
  ctx.imageSmoothingEnabled = true;
  ctx.clearRect(0,0, 400, 850);
  ctx.fillStye = "black";
  ctx.fillRect(0,0, 400, 850);
  ctx.font = 'normal 35px Montserrat';
  ctx.fillStyle = 'white';
  ctx.fillText("Click to Start", 100, 400);
  Util.drawText(ctx, 200, 625- 15, 12, 'yellow', 4);
  for (let i=0; i < 4; i++) { 
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(200, 625 + (i * 22), 10, 0, Math.PI * 2, true);
    ctx.fill();
  }

  document.getElementById("restart").addEventListener('click', () => {
    const game = new Game();
    new GameView(game, ctx).start();
  });
    
  document.getElementById("game-canvas").addEventListener('click', () => {
    const game = new Game();
    new GameView(game, ctx).start();
  });

});




/***/ }),

/***/ "./lib/serpent.js":
/*!************************!*\
  !*** ./lib/serpent.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(/*! ./moving_object */ "./lib/moving_object.js");
const Util = __webpack_require__(/*! ./util */ "./lib/util.js");
const Circle = __webpack_require__(/*! ./circle */ "./lib/circle.js");
const Block = __webpack_require__(/*! ./block */ "./lib/block.js");
const SerpentNode = __webpack_require__(/*! ./serpent_node */ "./lib/serpent_node.js");
const Line = __webpack_require__(/*! ./line */ "./lib/line.js");

class Serpent extends MovingObject {
  constructor(options) {
    options.radius = 10;
    options.vel = [0,0];
    options.color = 'yellow';
    // options.pos = [5,5];
    super(options);
    this.prevX = [];
    this.length = 4;
    this.leftColliding = false;
    this.rightColliding = false;
    // this.nodes = [];
    // for (let i = 0; i < this.length; i++) {
    //   this.nodes.push(new SerpentNode({pos: [this.pos[0], this.pos[1]+(i*22)] }))
    // }
    this.power = this.power.bind(this);
  }

  

  addLength(length) {
    this.length += length;
  }

  collideWith(otherObject) {
    // debugger;
    if (otherObject instanceof Circle) {
      this.length += otherObject.value;
      // this.updateLength()
      otherObject.remove();
      return 0;
    } else if (otherObject instanceof Block) {
      if (otherObject.value < this.length) {
        for (let i=0; i < otherObject.value; i++) {
          this.length -= 1;
        }
        // this.updateLength(otherObject.value);
        // this.length -= otherObject.value;
        otherObject.remove();
        return otherObject.value;
      }
      else {
        let length = this.length;
        this.length -= otherObject.value;
        // this.updateLength(otherObject.value);
        otherObject.remove();
        return length;
        // this.remove();
      }
    } else if (otherObject instanceof Line) {
        // debugger;
        if (otherObject.pos[0] > this.pos[0]) {
          this.rightColliding = true;
          // this.pos[0] = otherObject.pos - this.radius;
        } else {
          this.leftColliding = true;
          // this.pos[0] = otherObject.pos + this.radius;
        }
        this.vel = [0,0];
        return 0;
    }
  }
  power(impulse) {
    this.vel = [0, 0];

    // if (key === 'left' && this.pos[0] > 1) {
    //   this.vel[0] += 1; 
    // } else if (key === 'right' && this.pos[0] < 399) {
    //   this.vel[0] -= 1;
    // } 
    // debugger;
    // if (this.pos[0] > 1 && this.pos[0] < 8) {
    //   debugger;
    // }
    if (this.pos[0] < 1 ) {
        this.pos[0] = 2;
        return;
    }
    if (this.pos[0] > 399) {
      this.pos[0] = 398;
      return;
    }

    if (impulse[0] < 0 && this.pos[0] > 5 && this.pos[0] < 399 && !this.leftColliding) {
      this.vel[0] += impulse[0];
    } else if (impulse[0] > 0 && this.pos[0] > 5 && this.pos[0] < 399 && !this.rightColliding) {
      this.vel[0] += impulse[0];
    }
    this.leftColliding = false;
    this.rightColliding = false;
    // if (this.pos[0] > 1 && this.pos[0] < 399 && ) {
    //   this.vel[0] += impulse[0];
    // }
    // this.pos[1] += impulse[1];
  }

  resetVel() {
    this.vel = [0,0];
  }

  draw(ctx) {
    // ctx.fillStyle = this.color;
    // ctx.fillText(this.length, this.pos[0], this.pos[1]-15)
    Util.drawText(ctx, this.pos[0], this.pos[1]-15, 12, this.color, this.length);
    
    this.prevX.unshift(this.pos[0]);
    if (this.prevX.length > 1000) {
      this.prevX.pop();
    }
    for(let i = 0; i < this.length; i++) {
      const prev = this.prevX[i*5] === null ? this.pos[0] : this.prevX[i*5]
      let node = new SerpentNode({pos: [prev, this.pos[1] + (i)]});
      // this.nodes[i].changeVelocity(i, this.vel);
      node.draw(ctx, i, this.vel);

      // ctx.fillStyle = this.color;
      // ctx.beginPath();
      // ctx.arc(this.pos[0] + this.vel[0]*(i*(-10)), this.pos[1] + (i*22), this.radius, 0, Math.PI *2, true);
      // ctx.fill();
    }
  }
}

module.exports = Serpent;

/***/ }),

/***/ "./lib/serpent_node.js":
/*!*****************************!*\
  !*** ./lib/serpent_node.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(/*! ./moving_object */ "./lib/moving_object.js");

class SerpentNode extends MovingObject {
  constructor(options) {
    options.radius = 10;
    options.vel = [0,0];
    options.color = 'yellow';
    super(options);
  }

  changeVelocity(i, vel) {
    setTimeout(() => {this.vel = vel; }
    , 1000*i);
  }

  draw(ctx, i) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1] + (i*22), this.radius, 0, Math.PI*2, true);
    ctx.fill();
  }

}

module.exports = SerpentNode;

/***/ }),

/***/ "./lib/util.js":
/*!*********************!*\
  !*** ./lib/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

const Util = {
  // Normalize the length of the vector to 1, maintaining direction.
  dir(vec) {
    const norm = Util.norm(vec);
    return Util.scale(vec, 1 / norm);
  },
  // Find distance between two points.
  dist(pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  },
  // Find the length of the vector.
  norm(vec) {
    return Util.dist([0, 0], vec);
  },
  // Return a randomly oriented vector with the given length.
  randomVec(length) {
    const deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },
  // Scale the length of a vector by the given amount.
  scale(vec, m) {
    return [vec[0] * m, vec[1] * m];
  },

  wrap(coord, max) {
    if (coord < 0) {
      return max - (coord % max);
    } else if (coord > max) {
      return coord % max;
    } else {
      return coord;
    }
  },

  drawCircle(ctx, x, y, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, true);
  },

  drawText(ctx, x, y, size, color, text) {
    ctx.font = `normal ${size}px Montserrat`;
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
  },

  drawBlock(ctx, x,y, size, color) {
    const radius = 25;
    ctx.strokeStyle = color;
    ctx.lineJoin = "round";
    ctx.lineWidth = radius;

    ctx.strokeRect(
      x + (radius/2) - size/2,
      y + (radius/2) - size/2,
      size - radius,
      size - radius
    );
    ctx.fillStyle = color;
    ctx.fillRect(
      x + (radius / 2) -size/2,
      y + (radius / 2) -size/2,
      size - radius,
      size - radius
    );
  }
};

module.exports = Util;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map