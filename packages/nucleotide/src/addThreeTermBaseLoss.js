'use strict';

const baseLoss = require('./baseLoss');

function addThreeTermBaseLoss(mfs, threeTerm, i, options) {
  if (!options.wxyzBaseLoss) return;
  let loss = baseLoss(threeTerm);

  loss.forEach((mf) => {
    if (options.w) {
      mfs.push(`HO${mf}`.replace('$', `$w${i} `));
    }
    if (options.x) {
      mfs.push(`H-1${mf}`.replace('$', `$x${i} `));
    }
    if (options.y) {
      mfs.push(`O-2P-1${mf}`.replace('$', `$y${i} `));
    }
    if (options.z) {
      mfs.push(`O-3H-1P-1(+)${mf}`.replace('$', `$z${i} `));
    }
  });
}

module.exports = addThreeTermBaseLoss;
