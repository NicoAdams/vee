const _ = require('lodash');

class Timer {
  constructor(minDt=0, maxDt=Infinity) {
    this.minDt = minDt;
    this.maxDt = maxDt;
    this.last = 0;
    this.prevTicks = [];
    this.prevTickLimit = 100;
  }

  getTime() {
    return (new Date).getTime();
  }
  
  realTick() {
    var newTime = this.getTime();
    var dt = newTime - this.last;
    this.last = newTime;
    // Tracks FPS
    if (this.prevTicks.length > this.prevTickLimit) {
      this.prevTicks.shift(); // Removes first element
    }
    this.prevTicks.push(newTime);
    // Returns time delta
    return dt;
  }
  
  tick() {
    const realDt = this.realTick();
    return Math.min(realDt, this.maxDt);
  }
  
  start(tickFunction) {
    // Starts the timer, calling tickFunction on each tick
    this.last = this.getTime();
    setInterval(() => tickFunction(this.tick()), this.minDt);
  }
  
  getAvgDt() {
    if (this.prevTicks.length <= 1) {
      return 0;
    }
    return (_.last(this.prevTicks) - _.head(this.prevTicks)) / (this.prevTicks.length - 1);
  }
};

exports.Timer = Timer;