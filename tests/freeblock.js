/*
    Suggester
    Copyright (c) 2015 Yaroslav Gaponov <yaroslav.gaponov@gmail.com>
*/

var assert = require('assert');

var FreeBlock = require('../libs/freeblock');

describe('FreeBlock', function () {

    describe('ctor', function () {
        it('ctor without parameter', function () {
            assert.doesNotThrow(function () {
                new FreeBlock()
            })
        })
    })

    describe('funcs', function () {
        var freeblock = new FreeBlock();

        it('func mix', function () {
            assert(freeblock.fetch(10) === -1);

            freeblock.insert(0,13);
            freeblock.insert(20,110);
            freeblock.insert(30,48);

            assert(freeblock.fetch(50) === 20);
            assert(freeblock.fetch(50) === 60);
            assert(freeblock.fetch(25) === 30);
        })

    })

})
