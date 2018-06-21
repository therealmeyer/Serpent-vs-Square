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