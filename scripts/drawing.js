// This should just be temporary. We shouldn't just draw solid-color polys
// Instead, we should eventually draw images over objects

const _ = require('lodash');
const viewport = require('./viewport').viewport;

function rgb(r,g,b) {
  return "rgb("+r+","+g+","+b+")";
}

function fillPoly(points, color="WHITE") {
  const c = viewport.getCanvas();
  c.beginPath();
  
  if (points.length <= 1) { return; }
  const screenPoints = _.map(points, viewport.toScreen);

  let pos = _.head(screenPoints);
  c.moveTo(pos.x, pos.y);
  
  _.forEach(_.tail(screenPoints), (pos) => { c.lineTo(pos.x, pos.y) });
  
  c.fillStyle = color;
  c.fill();
}

exports.rgb = rgb;
exports.fillPoly = fillPoly;