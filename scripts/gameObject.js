// A GameObject should be a geometric shape + a "draw" function
// Eventually this should include a path to an image or animation 

const drawing = require('./drawing');
const physicsSettings = require('./physicsSettings').physicsSettings;
const Victor = require('victor');

// Basic object just bundles a shape with a way of drawing that shape
class GameObject {
  
  constructor(shape, options) {
    this.shape = shape;
    this.color = options.color || "WHITE";
    this.collidable = options.collidable || false;
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
  
  constructor(shape, options) {
    super(shape, options);
    this.vel = options.vel || new Victor(0, 0);
    this.accel = options.accel || new Victor(0, -physicsSettings.gravity);
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