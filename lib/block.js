const MovingObject = require("./moving_object");
const Util = require("./util");

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