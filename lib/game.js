const Line = require("./line");
const Score = require("./score");
const Serpent = require("./serpent");
const Block = require("./block");
const Circle = require("./circle");
const Util = require("./util");

class Game {
  constructor() {
    this.circles = [];
    this.blocks = [];
    this.serpents = [];
    this.lines = [];
    this.score = 0;
    
    this.addBlocks();
    this.addCircles();
    // this.addScore();
    this.addLines();
  }

  addSerpent() {
    const serpent = new Serpent({ pos: [200, 425], game: this });
    this.add(serpent);
    this.serpent = serpent;
    return serpent;
  }

  addBlocks() {
    const margin = 3;
    const blockSize = 98;
    for (let i = 0; i < 4; i++) {
      let x;
      if (i === 0 ) {
        x = margin + 50;
      } else {
        x = margin + (blockSize * i) + 50;
      }
      this.add(new Block({
        game: this,
        pos: [x, 0]
      }));
    }
  }

  addCircles() {
    const numCircles = Math.floor(Math.random() * 3) + 1;
    for (var i = 0; i < numCircles; i++) {
      const posX = Math.floor(Math.random() * 250) + 100;
      this.add(new Circle({
        game: this,
        pos: [posX, 200]
      }));
    }
  }

  addScore() {
    this.add(new Score({game: this}));
  }

  addLines() {
    this.add(new Line({game: this, pos: [100, 100]}));
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
    ctx.fillText(this.score, 350, 40);

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