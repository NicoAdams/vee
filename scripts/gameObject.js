// A GameObject should be a geometric shape + a "draw" function
// Eventually this should include a path to an image or animation 

const drawing = require('./drawing');

class GameObject {
  constructor(shape, color) {
    this.shape = shape;
    this.color = color;
  }
  
  draw() {
    drawing.drawPoly(this.shape.points, this.color);
  }
}

exports.GameObject = GameObject;