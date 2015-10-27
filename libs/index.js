/*
    Suggester
    Copyright (c) 2015 Yaroslav Gaponov <yaroslav.gaponov@gmail.com>
*/

var SparseArray = require('./sparsearray');
var SortedArray = require('./sortedarray');

function Index() {
    this._root = {
        phrases: [],
        next: new SparseArray()
    };
}

Index.prototype.add = function (word, indx) {
    var curr = this._root;
    curr.phrases = SortedArray(curr.phrases).add(indx).asArray();
    for (var i = 0; i < word.length; i++) {
        var letter = word.charCodeAt(i);
        if (!curr.next.has(letter)) {
            curr.next.put(letter, {
                phrases: [],
                next: new SparseArray()
            });
        }
        curr = curr.next.get(letter);
        curr.phrases = SortedArray(curr.phrases).add(indx).asArray();
    }
}

Index.prototype.remove = function (word, indx) {
    var curr = this._root;
    curr.phrases = SortedArray(curr.phrases).remove(indx).asArray();
    for (var i = 0; i < word.length; i++) {
        var letter = word.charCodeAt(i);
        if (!curr.next.has(letter)) {
            break;
        }
        curr = curr.next.get(letter);
        curr.phrases = SortedArray(curr.phrases).remove(indx).asArray();
    }
}

Index.prototype.get = function (word) {
    var curr = this._root;
    for (var i = 0; i < word.length; i++) {
        var letter = word.charCodeAt(i);
        if (curr.next.has(letter)) {
            curr = curr.next.get(letter);
        } else {
            return new SortedArray();
        }
    }
    return new SortedArray(curr.phrases);
}

module.exports = Index;
