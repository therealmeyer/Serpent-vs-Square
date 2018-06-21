const Util = require("./util");

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