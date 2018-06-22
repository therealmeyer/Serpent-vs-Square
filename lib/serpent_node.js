const MovingObject = require("./moving_object");

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

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, Math.PI*2, true);
    ctx.fill();
  }

}

module.exports = SerpentNode;