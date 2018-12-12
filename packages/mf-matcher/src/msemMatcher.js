'use strict';

/**
 * @param {object}   [entry={}}]
 * @param {object}   [options={}}]
 * @param {object}   [options.ionization={ mf: '', em: 0, charge: 0 }] - ionization method
 * @param {boolean}  [options.forceIonization=false] - If true ignore existing ionizations
 * @param {number}   [options.precision=1000] - The precision on the experimental mass
 * @param {number}   [options.minEM=0] - Minimal monoisotopic mass
 * @param {number}   [options.maxEM=+Infinity] - Maximal monoisotopic mass
 * @param {number}   [options.minMSEM=0] - Minimal monoisotopic mass observed by mass
 * @param {number}   [options.maxMSEM=+Infinity] - Maximal monoisotopic mass observed by mass
 * @param {number}   [options.minCharge=-Infinity] - Minimal charge
 * @param {number}   [options.maxCharge=+Infinity] - Maximal charge
 * @param {object}   [options.unsaturation={}}]
 * @param {number}   [options.unsaturation.min=-Infinity] - Minimal unsaturation
 * @param {number}   [options.unsaturation.max=+Infinity] - Maximal unsaturation
 * @param {number}   [options.unsaturation.onlyIntege=false] - Integer unsaturation
 * @param {number}   [options.unsaturation.onlyNonInteger=false] - Non integer unsaturation
 * @param {object}   [options.atoms] - object of atom:{min, max}
 * @return {boolean}
 * @return {boolean}
 */
const getMsInfo = require('mf-utilities/src/getMsInfo.js');

/**
 * We always recalculate msem
 *
 */

module.exports = function msemMatcher(entry, options = {}) {
  const {
    ionization = { mf: '', em: 0, charge: 0 },
    forceIonization = false,
    precision = 1000,
    minCharge = Number.MIN_SAFE_INTEGER,
    maxCharge = Number.MAX_SAFE_INTEGER,
    unsaturation = {},
    targetMass, // if present we will calculate the errors
    minEM = 0,
    maxEM = +Infinity,
    minMSEM = -Infinity,
    maxMSEM = +Infinity,
    atoms
  } = options;

  let ms = getMsInfo(entry, {
    ionization,
    forceIonization,
    targetMass
  });

  if (entry.em !== undefined) {
    if (entry.em < minEM || entry.em > maxEM) return false;
  }

  if (ms.em !== undefined) {
    if (ms.em < minMSEM || ms.em > maxMSEM) return false;
  }

  if (targetMass && ms.ppm > precision) return false;

  if (entry.charge !== undefined) {
    if (ms.charge < minCharge || ms.charge > maxCharge) return false;
  }
  if (unsaturation !== undefined && entry.unsaturation !== undefined) {
    if (!require('./unsaturationMatcher')(entry, unsaturation)) {
      return false;
    }
  }
  if (entry.atoms !== undefined && atoms) {
    // all the atoms of the entry must fit in the range
    for (let atom of Object.keys(entry.atoms)) {
      if (!atoms[atom]) return false;
      if (entry.atoms[atom] < atoms[atom].min) return false;
      if (entry.atoms[atom] > atoms[atom].max) return false;
    }
  }
  return ms;
};
