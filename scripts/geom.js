const Victor = require('victor');
const _ = require('lodash');

exports.geom = {};

class Range {
  
  constructor(a, b) {
    this.min = Math.min(a,b);
    this.max = Math.max(a,b);
  }
  
  get length() {
    return this.max - this.min;
  }
  get center() {
    return (this.max + this.min) / 2;
  }
  
  doesOverlap(that) {
    return !(this.min >= that.max || this.max <= that.min)
  }
  
  intersect(that) {
    if(!this.doesOverlap(that)) { return null; }
    return new Range(Math.max(this.min, that.min), Math.min(this.max, that.max));
  }
  
  union(that) {
    if(!this.doesOverlap(that)) { return null; }
    return new Range(Math.min(this.min, that.min), Math.max(this.max, that.max));
  }
  
  minTranslation(that) {
    // Minimum amount that "that" has to move to get off of "this"
    if(!this.doesOverlap(that)) { return 0; }
    if(this.center < that.center) {
      return this.max - that.min;
    }
    return -(that.max - this.min);
  }
}

class AABBRect {
  
  // loc = top-left corner
  constructor(loc, dim) {
    this.loc = loc;
    this.dim = dim;
  }
  
  get bottom() {return this.loc.y}
  get top() {return this.loc.y + this.dim.y}
  get left() {return this.loc.x} 
  get right() {return this.loc.x + this.dim.x}
  
  get xRange() {return new Range(this.left, this.right)}
  get yRange() {return new Range(this.bottom, this.top)}
  
  get points() {return [Victor(this.loc.x, this.loc.y),
                        Victor(this.loc.x + this.dim.x, this.loc.y),
                        Victor(this.loc.x + this.dim.x, this.loc.y + this.dim.y),
                        Victor(this.loc.x, this.loc.y + this.dim.y)
                       ]};
  
  move(dLoc) {return new AABBRect(this.loc.add(dLoc), this.dim)}
  
  getMtvCandidate(that) {
    const xMtv = new Victor(this.xRange.minTranslation(that.xRange), 0);
    const yMtv = new Victor(0, this.yRange.minTranslation(that.yRange));
    return _.minBy([xMtv, yMtv], v => (v.length()));
  }
}



exports.Range = Range;
exports.AABBRect = AABBRect;
