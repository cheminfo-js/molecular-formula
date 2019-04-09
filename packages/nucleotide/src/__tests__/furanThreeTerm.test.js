'use strict';

const { furanThreeTerm } = require('..');

describe('test nucleotide', () => {
  it('remove base of three terminal of HDampDtmpDcmp', () => {
    let modified = furanThreeTerm('HDampDtmpDcmp');
    expect(modified).toBe('HDampDtmpC5H6O4P');
  });
});
