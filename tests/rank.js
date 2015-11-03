/*
    Suggester
    Copyright (c) 2015 Yaroslav Gaponov <yaroslav.gaponov@gmail.com>
*/

var assert = require('assert');

var Rank = require('../libs/rank');

describe('Rank', function () {

    describe('ctor', function () {
        it('ctor without parameter', function () {
            assert.doesNotThrow(function () {
                new Rank()
            })
        })
    })

    describe('funcs', function () {
        var rank = new Rank();

        it('func increase', function () {
            for (var r = 1; r < 5; r++) {
                for (var i = 0; i < 10;i++) {
                    assert(rank.increase(i) === r)
                }
            }
        })

        it('func decrease', function () {
            for (var r = 3; r >= 0; r--) {
                for (var i = 0; i < 10;i++) {
                    assert(rank.decrease(i) === r)
                }
            }
        })

        it('func get', function () {
            assert(rank.get(10) === 0);
            assert(rank.increase(10) === 1);
            assert(rank.increase(10) === 2);
            assert(rank.decrease(10) === 1);
            assert(rank.decrease(10) === 0);
        })
        
        it('func set', function () {
            rank.set(10, 77);
            assert(rank.get(10) === 77);
        })
    })

})
