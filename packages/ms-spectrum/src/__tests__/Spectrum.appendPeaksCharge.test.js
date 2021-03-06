'use strict';

const { readFileSync } = require('fs');
const { join } = require('path');

const Spectrum = require('../Spectrum');

describe('test appendPeakCharge on Spectrum', () => {
  let chargedText = readFileSync(
    join(__dirname, 'data/multicharge.txt'),
    'utf8',
  );
  it('multicharged', () => {
    let spectrum = Spectrum.fromText(chargedText);
    let peaks = spectrum.peakPicking();
    peaks = peaks.filter((peak) => peak.y > 1000);
    let stats = new Array(10).fill(0);
    for (const peak of peaks) {
      stats[peak.charge]++;
    }

    expect(stats).toStrictEqual([0, 10, 124, 186, 122, 0, 0, 0, 0, 0]);
  });
});
