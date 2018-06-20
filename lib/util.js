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