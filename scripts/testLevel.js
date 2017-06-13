const World = require('./world').World;
const GameObject = require('./gameObject').GameObject;
const AABBRect = require('./geom').AABBRect;
const Character = require('./character').Character;
const rgb = require('./drawing').rgb;
const keyBindings = require('./keyBindings');
const util = require('./util');

const Victor = require('victor');

const world = new World();

const character = new Character();
world.addCharacter(character);

const testPlatform = new GameObject(
  new AABBRect(new Victor(-20,-10), new Victor(2,2)),
  rgb(249,0,0));
world.addObject(testPlatform);

exports.world = world;