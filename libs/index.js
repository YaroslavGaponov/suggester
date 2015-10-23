/*
    Suggester
    Copyright (c) 2015 Yaroslav Gaponov <yaroslav.gaponov@gmail.com>
*/

var SparseArray = require('./sparsearray');
var BitSet = require('./bitset');

function Index() {
    this._root = {
        bitset: BitSet.serialize(BitSet.EMPTY()),
        next: new SparseArray()
    };
}

Index.prototype.add = function (word, indx) {
    // this._root.bitset = BitSet.serialize(BitSet.unserialize(this._root.bitset).set(indx));
    this._root.bitset.push(indx);

    var curr = this._root;
    for (var i = 0; i < word.length; i++) {
        var letter = word.charCodeAt(i);
        if (!curr.next.has(letter)) {
            curr.next.put(letter, {
                bitset: BitSet.serialize(BitSet.EMPTY()),
                next: new SparseArray()
            });
        }
        curr = curr.next.get(letter);
        //curr.bitset = BitSet.serialize(BitSet.unserialize(curr.bitset).set(indx));
        curr.bitset.push(indx);
    }
}

Index.prototype.remove = function (word, indx) {
    this._root.bitset = BitSet.serialize(BitSet.unserialize(this._root.bitset).unset(indx));

    var curr = this._root;
    for (var i = 0; i < word.length; i++) {
        var letter = word.charCodeAt(i);
        if (!curr.next.has(letter)) {
            break;
        }
        curr = curr.next.get(letter);
        curr.bitset = BitSet.serialize(BitSet.unserialize(curr.bitset).unset(indx));
    }
}

Index.prototype.get = function (word) {
    var curr = this._root;
    for (var i = 0; i < word.length; i++) {
        var letter = word.charCodeAt(i);
        if (curr.next.has(letter)) {
            curr = curr.next.get(letter);
        } else {
            return BitSet.EMPTY();
        }
    }
    return BitSet.unserialize(curr.bitset);
}

module.exports = Index;
