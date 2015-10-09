var assert = require('assert');

var Analyzer = require('../libs/analyzer');

describe('Analyzer', function () {

    describe('func', function () {
        it('one word', function () {
            assert.deepEqual(Analyzer('hello'), ['hello'])
        })
        it('two word', function () {
            assert.deepEqual(Analyzer('hello world'), ['hello', 'world'])
        })
        it('one word with lot spaces', function () {
            assert.deepEqual(Analyzer('        hello         world    '), ['hello', 'world'])
        })        
    })
})
