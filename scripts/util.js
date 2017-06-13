const _ = require('lodash');

exports.valueProduct = function(iterable) {
  return _.reduce(_.values(iterable), (a,b) => a*b, 1)
}

exports.forEachPair = function(iterable, func2) {
  const values = _.values(iterable);
  for(let i=0; i<values.length; i++) {
    for(let j=i+1; j<values.length; j++) {
      func2(values[i], values[j]);
    }
  }
  
  
}

