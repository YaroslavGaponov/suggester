var assert = require('assert');

var BitSet = require('../libs/bitset');

describe('BitSet', function () {

    describe('ctor', function () {
        it('ctor without parameter', function () {
            assert.doesNotThrow(function () {
                new BitSet()
            })
        })
    })

    describe('funcs', function () {
        var bitset = new BitSet();

        it('func set/map', function () {            
            bitset.set(10);
            bitset.set(100);
            bitset.set(1000);
            assert.deepEqual(bitset.map(parseInt), [10, 100, 1000]);
        })
    })

})
