var SparseArray = require('./sparsearray');
var BitSet = require('./bitset');

function Index() {
    this._root = {
        bitset: new BitSet(),
        next: new SparseArray()
    };
}

Index.prototype.add = function (word, indx) {
    this._root.bitset.set(indx);

    var curr = this._root;
    for (var i = 0; i < word.length; i++) {
        var letter = word.charCodeAt(i);
        if (!curr.next.has(letter)) {
            curr.next.put(letter, {
                bitset: new BitSet(),
                next: new SparseArray()
            });
        }
        curr = curr.next.get(letter);
        curr.bitset.set(indx);
    }
}

Index.prototype.remove = function (word, indx) {

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
    return curr.bitset;
}

module.exports = Index;
