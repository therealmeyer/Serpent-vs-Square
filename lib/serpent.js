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
    // this.nodes = [];
    // for (let i = 0; i < this.length; i++) {
    //   this.nodes.push(new SerpentNode({pos: [this.pos[0], this.pos[1]+(i*22)] }))
    // }
  }

  updateLength(value) {
    
  }

  addLength(length) {
    this.length += length;
  }

  collideWith(otherObject) {
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
          this.pos[0] = otherObject.pos - this.radius;
        } else {
          this.pos[0] = otherObject.pos + this.radius;
        }
        this.vel = [0,0];
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
    if (this.pos[0] > 1 && this.pos[0] < 399) {
      this.vel[0] += impulse[0];
    }
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
      const prev = this.prevX[i] === null ? this.pos[0] : this.prevX[i]
      let node = new SerpentNode({pos: [prev, this.pos[1] + (i*15)]});
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