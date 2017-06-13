const Victor = require('victor');

const physicsSettings = {}

physicsSettings.baseSpeed = Math.pow(10, -3);
physicsSettings.gravity = 1 * physicsSettings.baseSpeed;

exports.physicsSettings = physicsSettings;
