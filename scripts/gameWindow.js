console.log('gameWindow:', __dirname);

const geom = require('./geom');
const viewport = require('./viewport').viewport;
const timing = require('./timing');

const World = require('./world').World;

const testLevel = require('./testLevel');

const Victor = require('victor');

viewport.init();

const frameTimer = new timing.Timer();
const gameTimer = new timing.Timer();

frameTimer.start(() => {
	viewport.clear();
	testLevel.world.draw();
});
gameTimer.start((dt) => {
	testLevel.testObject.shape.move(new Victor(dt/70.,dt/70.));
	if(testLevel.testObject.shape.bottom > 36) {
		testLevel.testObject.shape.move(new Victor(-91, -91))
	}
});