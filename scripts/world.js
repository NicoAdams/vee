/* A "world" is a collection of all the objects in an area
 * 
 * - Calling "world.handleCollisions()" should resolve all object collisions
 * 
 * - Calling "world.update(dt)" should update all objects' states. This
 * includes physics (speed + accel) and other physical changes (eg. a platform
 * vanishing, moving or changing shape).
 * 
 * A world can also have one (or zero) characters. The character is handled
 * by holding onto a single special "character" value for the world that has
 * a "character.handleActions(dt)" function, which handles key presses.
 * 
 * However, the character ALSO has a physics object, "character.object", with
 * a "character.object.update(dt)" function. The "character.object" should be
 * treated like a regular game object and added using "world.addObject".
 * 
 * To update the world, call "world.step(dt)". This function calls (in order)
 * 1) "character.handleActions(dt)" to handle all key input
 * 2) "object.update(dt)" on every object to handle object movement
 * 3) "this.handleCollisions()" to handle all collisions
 */

const _ = require('lodash');
const util = require('./util');
const detectAndResolveCollision = require('./collision').detectAndResolveCollision;

let currObjectId = 0;
function getUniqueObjectId() {
  return currObjectId++;
}

exports.World = class {
  constructor() {
    this.objects = {};
    this.collidableObjects = {};
    
    // This makes it easier to delete an object
    this.objectCollections =
      [this.objects, this.collidableObjects];
    
    this.character = null;
    this.characterId = null;
  }
  
  draw() {
    _.forEach(this.objects, (o) => {o.draw()});
  }
  
  addObject(object) {
    // Adds an object
    // Then returns an ID that can be used to delete the object
    const id = getUniqueObjectId();
    
    this.objects[id] = object;
    if(object.isCollidable) {
      this.collidableObjects[id] = object;
    }
    
    return id;
  }
  
  addCharacter(character) {
    // Adds a character and returns a deletion ID
    this.character = character;
    this.characterId = this.addObject(character.object);
  }
  
  handleCollisions() {
    util.forEachPair(this.collidableObjects, (o1, o2) => {
      detectAndResolveCollision(o1, o2);
    })
  }
  
  update(dt) {
    _.forEach(this.objects, (object) => {object.update(dt)})
  }
  
  step(dt) {
    this.character.handleActions(dt);
    this.update(dt);
    this.handleCollisions();
  }
  
  removeObject(id) {
    // Removes an object from all lists by its ID
    // (We can delete a key from a javascript object whether or not that key exists)
    _.forEach(this.objectLists, (list) => {
      delete list[id]
    });
  }
  
  removeCharacter() {
    this.character = null;
    this.removeObject(this.characterId);
  }
}
