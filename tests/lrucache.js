/*
    Suggester
    Copyright (c) 2015 Yaroslav Gaponov <yaroslav.gaponov@gmail.com>
*/

var assert = require('assert');

var LruCache = require('../libs/lrucache');

describe('LruCache', function () {

    describe('ctor', function () {
        it('ctor without parameter', function () {
            assert.doesNotThrow(function () {
                new LruCache()
            })
        })
    })

    describe('funcs', function () {
        var cache = new LruCache(2);

        it('funcs', function () {
            cache.add('first','first');
            cache.add('second', 'second');
            assert(cache.get('first') === 'first');
            cache.add('third', 'third');
            assert(cache.get('second') === undefined);
            assert(cache.get('first') === 'first');
            assert(cache.get('third') === 'third');
        })

    })

})
