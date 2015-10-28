/*
    Suggester
    Copyright (c) 2015 Yaroslav Gaponov <yaroslav.gaponov@gmail.com>
*/

var assert = require('assert');

var SortedSet = require('../libs/sortedset');

describe('SortedSet', function () {

    describe('ctor', function () {
        it('ctor without parameter', function () {
            assert.doesNotThrow(function () {
                new SortedSet()
            })
        })
    })

    describe('funcs', function () {
        var ss = new SortedSet();

        it('func add', function () {
            ss.add(10);
            ss.add(1);
            ss.add(101);
            ss.add(5);
            ss.add(3);
            ss.add(107);
            assert.deepEqual(ss.asArray(), [1,3,5,10,101,107]);
            assert.deepEqual(ss.asArray(), [1,3,5,10,101,107]);
        })

        it('func indexOf', function () {
            assert(ss.indexOf(15) === -1);
            assert(ss.indexOf(1) === 0);
            assert(ss.indexOf(10) === 3);
            assert(ss.indexOf(101) === 4);

        })

        it('func remove', function () {
            ss.remove(101);
            assert(ss.indexOf(101) === -1);
            assert(ss.indexOf(107) === 4);
        })

        it('func AND', function () {
            var ss2 = new SortedSet([3,5]);
            assert.deepEqual(ss2.AND(ss).map(Number), [3,5]);
        })

        it('func OR', function () {
            var ss2 = new SortedSet([3,77]);
            assert.deepEqual(ss2.OR(ss).map(Number), [1,3,5,10,77, 107]);
        })
    })

})
