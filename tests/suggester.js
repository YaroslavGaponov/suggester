var assert = require('assert');
var fs = require('fs');

var Suggester = require('../libs/suggester');

describe('Suggester', function () {

    describe('funcs', function () {
        var suggester = new Suggester();

        it('func add', function () {
            fs
                .readFileSync('./data/phrases.txt', 'utf8')
                .split('\r\n')
                .map(function(text) {
                    return text.replace(/[\s]+/,' ')
                })                
                .forEach(function(text) {
                    suggester.add(text);
                })
        })

        it('func search', function () {
            assert.deepEqual(suggester.search('curae stupent'), ['curae leves loquuntur, ingentes stupent. малые печали говорят, большие - безмолвны.']);
            assert.deepEqual(suggester.search('stupent curae'), ['curae leves loquuntur, ingentes stupent. малые печали говорят, большие - безмолвны.']);
            assert.deepEqual(suggester.search('stupent'), ['curae leves loquuntur, ingentes stupent. малые печали говорят, большие - безмолвны.']);
            assert.deepEqual(suggester.search('credit все'), ['insanus omnis furere credit. сумасшедший считает, что все остальные - безумцы.']);
        })

        it('func remove', function () {
        })
        
        it('function rank', function() {
            suggester.add('hello world');
            suggester.add('hello city');
            suggester.add('hello city');
            suggester.add('hello city');
            suggester.add('hello boy');
            suggester.add('hello girl');
            suggester.add('hello girl');
            assert.deepEqual(suggester.search('hello', 2), ['hello city', 'hello girl']);
            suggester.add('hello world');
            suggester.add('hello world');
            suggester.add('hello world');
            assert.deepEqual(suggester.search('hello', 1), ['hello world']);
        })

        it('function remove', function() {
            var text = 'aaa bbb';
            suggester.add(text);
            suggester.add(text);
            assert.deepEqual(suggester.search('aaa'), ['aaa bbb']);
            suggester.remove(text);
            assert.deepEqual(suggester.search('bbb'), ['aaa bbb']);
            suggester.remove(text);
            assert.deepEqual(suggester.search('aaa'), []);
        })        
        
    })

})
