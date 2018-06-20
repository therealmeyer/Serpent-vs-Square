const Util = require("./util");
const MovingObject = require("./moving_object");

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