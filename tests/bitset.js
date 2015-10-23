/*
    Suggester
    Copyright (c) 2015 Yaroslav Gaponov <yaroslav.gaponov@gmail.com>
*/

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

        it('func unset/map', function () {
            bitset.set(10);
            bitset.set(100);
            bitset.set(1000);
            bitset.unset(100);
            assert.deepEqual(bitset.map(parseInt), [10, 1000]);
            bitset.unset(1000);
            assert.deepEqual(bitset.map(parseInt), [10]);
            bitset.unset(10);
            assert.deepEqual(bitset.map(parseInt), []);
        })

        it('func serialize/unserialize', function () {
            var bitSet = new BitSet();
            for (var i = 0; i < 10; i++) {
                bitSet.set(i);
            }
            var buf = BitSet.serialize(bitSet);
            var bitSet = BitSet.unserialize(buf);
            assert.deepEqual(bitSet.map(Number), [0,1,2,3,4,5,6,7,8,9]);
        })
    })

})
