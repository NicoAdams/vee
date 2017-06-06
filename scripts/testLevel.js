console.log('testLevel:', __dirname);

const World = require('./world').World;
const GameObject = require('./gameObject').GameObject;
const Rect = require('./geom').Rect;
const rgb = require('./drawing').rgb;
const Victor = require('victor');

const world = new World();

const testObject = new GameObject(
  new Rect(new Victor(-20,-10), new Victor(20,20)),
  rgb(249,0,0));

world.addObject(testObject);

exports.world = world;
exports.testObject = testObject;