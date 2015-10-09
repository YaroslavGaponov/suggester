var assert = require('assert');

var Index = require('../libs/index');

describe('Index', function () {

    describe('ctor', function () {
        it('ctor without parameter', function () {
            assert.doesNotThrow(function () {
                new Index()
            })
        })
    })

    describe('funcs', function () {
        var index = new Index();

        it('func get', function () {
            
            index.add('hello', 1);
            index.add('hel', 5);
            index.add('helloca', 7);
            assert.deepEqual(index.get('h').map(parseInt), [1 , 5, 7])
            assert.deepEqual(index.get('hel').map(parseInt), [1 , 5, 7])
            assert.deepEqual(index.get('hell').map(parseInt), [1 , 7])
            assert.deepEqual(index.get('helloc').map(parseInt), [7])
            
            index.add('vivere in diem',100);
            assert.deepEqual(index.get('vi').map(parseInt), [100])
        })

    })

})
