// A GameObject should be a geometric shape + a "draw" function
// Eventually this should include a path to an image or animation 

const drawing = require('./drawing');
const Victor = require('victor');

// Basic object just bundles a shape with a way of drawing that shape
class GameObject {
  constructor(shape, color, collidable = false) {
    this.shape = shape;
    this.color = color;
    this.collidable = collidable;
  }
  
  get isDynamic() {
    return false;
  }
  
  get isCollidable() {
    return this.collidable;
  }
  
  update(dt) {}
  
  draw() {
    drawing.fillPoly(this.shape.points, this.color);
  }
}

// Object that handles Newtonian speed/accel with its "update" method
class DynamicObject extends GameObject {
  constructor(shape,
              color,
              collidable = false,
              vel = new Victor(0,0),
              accel = new Victor(0,0)) {
    super(shape, color, collidable);
    this.vel = vel;
    this.accel = accel;
  }
  
  get isDynamic() {
    return true;
  }
  
  update(dt) {
    this.vel.add(this.accel.clone().multiplyScalar(dt));
    this.shape.move(this.vel.clone().multiplyScalar(dt));
  }
}

exports.GameObject = GameObject;
exports.DynamicObject = DynamicObject;