'use strict';

const loadKnapSack = require('../loadKnapSack');

describe('test loadKnapSack', () => {
    it('should return 42', async () => {
        let data = await loadKnapSack();

        console.log(data.length);


        // expect(myModule()).toEqual(42);
    });
});
