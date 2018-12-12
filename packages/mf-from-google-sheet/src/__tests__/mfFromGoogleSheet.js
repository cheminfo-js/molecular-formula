'use strict';

var mfFromGoogleSheet = require('..');

// The original document is on: https://docs.google.com/spreadsheets/d/15Kuc5MeOhvm4oeTMvEuP1rWdRFiVWosxXhYwAmuf3Uo/edit#gid=0
test('Test getReferenceList with existing', async () => {
  var result = await mfFromGoogleSheet(
    'https://googledocs.cheminfo.org/spreadsheets/d/15Kuc5MeOhvm4oeTMvEuP1rWdRFiVWosxXhYwAmuf3Uo/export?format=tsv'
  );
  expect(result).toHaveLength(1684);
  expect(result[0].mw).toBeCloseTo(5.963091372400585, 5);
  expect(result[0].em).toBeCloseTo(5.95304980662, 5);
  expect(result[0].ms.em).toBeCloseTo(5.95250122671093, 5);
});

test('Test getReferenceList with non existing document', () => {
  expect(
    mfFromGoogleSheet(
      'https://googledocs.cheminfo.org/spreadsheets/d/15Kuc5MeOhvm4xxxVWosxXhYwAmuf3Uo/export?format=tsv'
    )
  ).rejects.toThrow('404');
});
