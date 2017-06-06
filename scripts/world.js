// Not sure we want to keep a file generically called "World"
// Can use this for testing objects for now

const _ = require('lodash');

let currObjectId = 0;
function getUniqueObjectId() {
  return currObjectId++;
}

class World { 
  
  constructor() {
    this.objects = {},
    this.solidObjects = {}
  }
  
  draw() {
    _.forEach(this.objects, (o) => {o.draw()});
  }
  
  addObject(object) {
    // Adds any object
    const id = getUniqueObjectId();
    this.objects[id] = object;
    return id;
  }
  
  addSolid(object) {
    // Adds an object that acts like a platform
    const id = this.addObject(object);
    this.solidObjects[id] = object;
    return id;
  }
  
  removeObject(id) {
    // Removes an object from all lists by its ID
    // (We can delete a key from a javascript object whether or not that key exists)
    delete this.objects[id];
    delete this.solidObjects[id];
  }
}

exports.World = World;