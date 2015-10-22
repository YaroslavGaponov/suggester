/*
    Suggester
    Copyright (c) 2015 Yaroslav Gaponov <yaroslav.gaponov@gmail.com>
*/

var assert = require('assert');

var StringList = require('../libs/stringlist');

describe('StringList', function () {

    describe('ctor', function () {
        it('ctor without parameter', function () {
            assert.doesNotThrow(function () {
                new StringList()
            })
        })
        it('ctor with normal parameter', function () {
            assert.doesNotThrow(function () {
                new StringList(10000)
            })
        })
        it('ctor with not normal parameter - negative', function () {
            assert.throws(function () {
                new StringList(-Number.MAX_VALUE)
            });
        })

        it('ctor with not normal parameter - zero', function () {
            assert.throws(function () {
                new StringList(0)
            })
        })

        it('ctor with not normal parameter - huge', function () {
            assert.throws(function () {
                new StringList(Number.MAX_VALUE)
            })
        })
    })

    describe('funcs', function () {
        var list = new StringList();

        it('func add', function () {
            for (var i = 0; i < 1000; i++) {
                assert(list.add('hello #' + i) === i);
            }
        })

        it('func length', function () {
            assert(list.length() === 1000);
        })

        it('func get', function () {
            for (var i = 0; i < 1000; i++) {
                assert(list.get(i) === ('hello #' + i));
            }
        })

        it('func clear', function () {
            list.clear();
            assert(list.length() === 0);
        })

        it('func non-standard symbols', function () {
            var indx = list.add('vivere in diem. жить одним днем.');
            assert(list.get(indx) === 'vivere in diem. жить одним днем.');
        })

    })

})
