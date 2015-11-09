/*
    Suggester
    Copyright (c) 2015 Yaroslav Gaponov <yaroslav.gaponov@gmail.com>
*/

// all modules
var StringList = require('./stringlist');
var Rank = require('./rank');
var Analyzer = require('./analyzer');
var Index = require('./index');

/**
 * Creates an instance of Suggester
 *
 * @constructor
 */
function Suggester() {
    this._phrases = new StringList();
    this._ranks = new Rank();
    this._index = new Index();
    this._analyzer = Analyzer;
}

Suggester.prototype._search = function (text) {
    var self = this;

    return this._analyzer(text)
        .map(function (word) {
            return self._index.get(word)
        })
        .reduce(function (a, b) {
            return a.AND(b);
        })
        .map(function (indx) {
            return {
                indx: indx,
                text: self._phrases.get(indx)
            }
        })
        .filter(function (a) {
            return a.text === text
        })
        .map(function (a) {
            return a.indx
        })
        .pop();
}

/**
 * Add text to suggest index
 *
 * @param {string} text Text
 * @param {number=} [rank = rank + 1] rank - Rank
 */
Suggester.prototype.add = function (text, rank) {
    var self = this;

    var indx = this._search(text);

    if (indx === undefined) {
        indx = this._phrases.add(text);
        this._analyzer(text)
            .forEach(function (word) {
                self._index.add(word, indx);
            });
    }
    if (arguments.length >= 2) {
        this._ranks.set(indx, rank);
    } else {
        this._ranks.increase(indx);
    }
}

/**
 * Remove text from suggest index
 *
 * @param {string} text - Text
 */
Suggester.prototype.remove = function (text) {
    var self = this;

    var indx = this._search(text);
    if (indx === undefined) {
        return false;
    }
    var rank = this._ranks.decrease(indx);
    if (rank === 0) {
        var text = this._phrases.get(indx);
        this._analyzer(text)
            .forEach(function (word) {
                self._index.remove(word, indx);
            })
        this._phrases.remove(indx);
    }
    return true;
}

/**
 * Search suggestion by some text
 *
 * @param {string} text - Text
 * @param {number=} [size=10] size - Max size
 * @return {string[]} Array of text
 */
Suggester.prototype.search = function (text, size) {
    var self = this;

    return this._analyzer(text)
        .map(function (word) {
            return self._index.get(word)
        })
        .reduce(function (a, b) {
            return a.AND(b);
        })
        .map(function (indx) {
            return {
                indx: indx,
                rank: self._ranks.get(indx)
            }
        })
        .sort(function (a, b) {
            return b.rank - a.rank
        })
        .slice(0, size || 10)
        .map(function (a) {
            return self._phrases.get(a.indx)
        })
}

module.exports = Suggester;
