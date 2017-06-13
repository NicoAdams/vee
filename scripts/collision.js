const geom = require('./geom');
const _ = require('lodash');

exports.resolveCollision = function(obj1, obj2) {
  // Only handles static-dynamic collisions right now, but we could change that
  const mtvForObj1 = _.minBy(
    [obj1.shape.getMtvCandidate(obj2),
     obj2.shape.getMtvCandidate(obj1).scalatMultiply(-1)],
    (v) => v.length());
  
  const [dynamicObj, staticObj, mtvForDynamicObj] = 
    obj1.isDynamic
    ? [obj1, obj2, mtvForObj1]
    : [obj2, obj1, mtvForObj1.scalarMultiply(-1)];
  
  if(dynamicObj.isStatic) {
    // Two static objects are colliding; ignore this collision
    console.warn("Static-static collision");
    return;
  }
  
  if(staticObj.isDynamic) {
    // Dynamic-dynamic collisions are hard, so skip them for now
    console.warn("Dynamic-dynamic collision");
    return;
  }
  
  // Moves the dynamic object off the static one
  dynamicObj.shape.move(mtvForDynamicObj);
  
  // Sets the dynamic object's speed to 0 (ie. completely inelastic collision)
  dynamicObj.vel = new Victor(0,0);
}