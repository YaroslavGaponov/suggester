/*
    Suggester
    Copyright (c) 2015 Yaroslav Gaponov <yaroslav.gaponov@gmail.com>
*/

var SparseArray = require('./sparsearray');
var SortedSet = require('./sortedset');
var LruCache = require('./lrucache');

function Index() {
    this._root = {
        phrases: [],
        next: new SparseArray()
    };
    this._lruCache = new LruCache();
}

Index.prototype.add = function (word, indx) {
    this._lruCache.clean();

    var curr = this._root;
    curr.phrases = SortedSet(curr.phrases).add(indx).asArray();
    for (var i = 0; i < word.length; i++) {
        var letter = word.charCodeAt(i);
        if (!curr.next.has(letter)) {
            curr.next.put(letter, {
                phrases: [],
                next: new SparseArray()
            });
        }
        curr = curr.next.get(letter);
        curr.phrases = SortedSet(curr.phrases).add(indx).asArray();
    }
}

Index.prototype.remove = function (word, indx) {
    this._lruCache.clean();

    var curr = this._root;
    curr.phrases = SortedSet(curr.phrases).remove(indx).asArray();
    for (var i = 0; i < word.length; i++) {
        var letter = word.charCodeAt(i);
        if (!curr.next.has(letter)) {
            break;
        }
        curr = curr.next.get(letter);
        curr.phrases = SortedSet(curr.phrases).remove(indx).asArray();
    }
}

Index.prototype.get = function (word) {
    var phrases = this._lruCache.get(word);
    if (phrases) {
        return new SortedSet(phrases);
    }

    var curr = this._root;
    for (var i = 0; i < word.length; i++) {
        var letter = word.charCodeAt(i);
        if (curr.next.has(letter)) {
            curr = curr.next.get(letter);
        } else {
            this._lruCache.add(word, []);
            return new SortedSet();
        }
    }

    this._lruCache.add(word, curr.phrases);
    return new SortedSet(curr.phrases);
}

module.exports = Index;
