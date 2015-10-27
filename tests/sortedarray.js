/*
    Suggester
    Copyright (c) 2015 Yaroslav Gaponov <yaroslav.gaponov@gmail.com>
*/

var assert = require('assert');

var SortedArray = require('../libs/sortedarray');

describe('SortedArray', function () {

    describe('ctor', function () {
        it('ctor without parameter', function () {
            assert.doesNotThrow(function () {
                new SortedArray()
            })
        })
    })

    describe('funcs', function () {
        var sa = new SortedArray();

        it('func add', function () {
            sa.add(10);
            sa.add(1);
            sa.add(101);
            sa.add(5);
            sa.add(3);
            sa.add(107);
            assert.deepEqual(sa.asArray(), [1,3,5,10,101,107]);
            assert.deepEqual(sa.asArray(), [1,3,5,10,101,107]);
        })

        it('func indexOf', function () {
            assert(sa.indexOf(15) === -1);
            assert(sa.indexOf(1) === 0);
            assert(sa.indexOf(10) === 3);
            assert(sa.indexOf(101) === 4);

        })

        it('func remove', function () {
            sa.remove(101);
            assert(sa.indexOf(101) === -1);
            assert(sa.indexOf(107) === 4);
        })

        it('func AND', function () {
            var sa2 = new SortedArray([3,5]);
            assert.deepEqual(sa2.AND(sa).map(Number), [3,5]);
        })

        it('func OR', function () {
            var sa2 = new SortedArray([3,77]);
            assert.deepEqual(sa2.OR(sa).map(Number), [1,3,5,10,77, 107]);
        })
    })

})
