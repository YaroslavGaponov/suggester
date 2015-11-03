/*
    Suggester
    Copyright (c) 2015 Yaroslav Gaponov <yaroslav.gaponov@gmail.com>
*/

var StringList = require('./stringlist');
var Rank = require('./rank');
var Analyzer = require('./analyzer');
var Index = require('./index');

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
