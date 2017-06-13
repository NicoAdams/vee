const geom = require('./geom');
const viewport = require('./viewport').viewport;
const timing = require('./timing');
const keyBindings = require('./keyBindings');
const testWorld = require('./testLevel').world;
const Victor = require('victor');

viewport.init();

const minUpdateTime = 0;
const minDrawTime = 0;

const frameTimer = new timing.Timer(minDrawTime);
const gameTimer = new timing.Timer(minUpdateTime);

frameTimer.start(() => {
  viewport.clear();
  testWorld.draw();
});
gameTimer.start((dt) => {
  testWorld.step(dt);
});

// Any variable exported here will be accessible in the console
// (It will be a property of the global variable "game")
exports.testWorld = testWorld;
exports.frameTimer = frameTimer;
exports.gameTimer = gameTimer;
