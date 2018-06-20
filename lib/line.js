const Util = require("./util");
const MovingObject = require("./moving_object");

class Line extends MovingObject {
  constructor(options = {}) {
    options.color = 'white';
    options.pos = options.pos;
    options.vel = [0, 1];
    super(options);
    this.length = 100;
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