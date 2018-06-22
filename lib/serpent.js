const MovingObject = require("./moving_object");
const Util = require("./util");
const Circle = require("./circle");
const Block = require("./block");
const SerpentNode = require("./serpent_node");
const Line = require("./line");

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
        // if (this.pos[0] < otherObject.pos[0] + 2 && this.pos[0] < otherObject.pos[0] -2) {
        //   this.pos[0] = otherObject.pos[0] -10;
        //   return 0;
        // }

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

    // 
    // debugger;
    // if (this.pos[0] > 1 && this.pos[0] < 8) {
    //   debugger;
    // }

    // if (this.pos[0] + impulse[0] + this.vel[0] < this.radius ||
    //   this.pos[0] + this.radius + impulse[0] + this.vel[0] > 399) {
    //   impulse[0] = 0;
    //   this.vel[0] = 0;
    // }

    // console.log(this.pos[0]);

    if (this.pos[0] + this.radius > 399 && impulse[0] > 0) {
      // return;
      impulse[0] = 0;
      this.pos[0] = 389;
      return;
    }

    if (impulse[0] < 0 && !this.leftColliding) {
      this.vel[0] += impulse[0];
    } else if (impulse[0] > 0 && !this.rightColliding) {
      this.vel[0] += impulse[0];
    } else {
      // debugger;
    }

    this.leftColliding = false;
    this.rightColliding = false;


    // if (this.pos[0] > 1 && this.pos[0] < 399 ) {
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
    if (this.pos[0] + this.radius > 399) {
      this.pos[0] = 389;
    } else if (this.pos[0] - this.radius < 1) {
      this.pos[0] = 11;
    }

    Util.drawText(ctx, this.pos[0], this.pos[1]-15, 12, this.color, this.length);
    this.mostPrev = [this.pos[0], this.pos[1]];
    
    this.prevX.unshift(this.pos[0]);
    if (this.prevX.length > 4000) {
      this.prevX.pop();
    }
    // console.log(this.prevX);

    this.mostPrevIndex = 1;
    let prevPosX;
    let prevPosY;
    for(let i = 0; i < this.length; i++) {
      let index = 0;
      if (i === 0) {
        prevPosX = this.pos[0];
        prevPosY = this.pos[1];
      } else {
        index = this.mostPrevIndex;
        prevPosX = this.prevX[index] === undefined ? this.pos[0] : this.prevX[index];
        prevPosY = this.pos[1] + (index);
        while (Util.dist([prevPosX, this.pos[1] + index], this.mostPrev ) < 21) {
          prevPosX = this.prevX[index];
          prevPosY = this.pos[1] + (index);
          index += 1;
        }
        this.mostPrev = [prevPosX, prevPosY];
        this.mostPrevIndex = index;
        // console.log("most-prev", this.mostPrev);
      }
      let node = new SerpentNode({ pos: [prevPosX, prevPosY] });
      node.draw(ctx, i, this.vel);
  }


    // for (let i = 0; i < this.length; i++) {
    //   // debugger;
    //   const prevPos = this.prevX[i*4] === null ? this.pos[0] : this.prevX[i*4]
    //   let node = new SerpentNode({pos: [prevPos, this.pos[1] + (i*22)]});
    //   node.draw(ctx);
    // }
      // ctx.fillStyle = this.color;
      // ctx.beginPath();
      // ctx.arc(this.pos[0] + this.vel[0]*(i*(-10)), this.pos[1] + (i*22), this.radius, 0, Math.PI *2, true);
      // ctx.fill();
    
  }
}

module.exports = Serpent;