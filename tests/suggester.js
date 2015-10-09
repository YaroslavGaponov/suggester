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

    })

})
