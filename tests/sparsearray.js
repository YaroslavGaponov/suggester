/*
    Suggester
    Copyright (c) 2015 Yaroslav Gaponov <yaroslav.gaponov@gmail.com>
*/

var assert = require('assert');

var SparseArray = require('../libs/sparsearray');

describe('SparseArray', function () {

    describe('ctor', function () {
        it('ctor without parameter', function () {
            assert.doesNotThrow(function () {
                new SparseArray()
            })
        })
    })

    describe('funcs', function () {
        var sa = new SparseArray();

        it('func put', function () {
            for (var i = 0; i < 1000; i++) {
                assert(sa.put(i, 'hello #' + i));
            }
        })

        it('func get', function () {
            for (var i = 0; i < 1000; i++) {
                assert(sa.get(i) === ('hello #' + i));
            }
        })

        it('func remove', function () {
            sa.remove(100);
            assert(sa.get(100) === undefined);
        })

    })

})
