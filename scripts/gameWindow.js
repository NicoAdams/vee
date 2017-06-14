const viewport = require('./viewport').viewport;
const Timer = require('./timing').Timer;
const testWorld = require('./testLevel').world;

viewport.init();

const minDrawTime = 1;
const minUpdateTime = 1;
const frameTimer = new Timer(minDrawTime);
const gameTimer = new Timer(minUpdateTime);

frameTimer.start(() => {
  viewport.clear();
  testWorld.draw();
});
gameTimer.start((dt) => {
  testWorld.step(dt);
});

// Any variable exported here will be accessible in the console
// (as a property of the global variable "game")
exports.testWorld = testWorld;
exports.frameTimer = frameTimer;
exports.gameTimer = gameTimer;
