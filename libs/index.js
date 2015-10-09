var BitSet = require('./bitset');

function Index() {
    this._root = { bitset: new BitSet(), link: Object.create(null) };
}

Index.prototype.add = function (word, indx) {
    var arr = word.split('');
    
    var curr = this._root;        
    while (arr.length > 0) {        
        var letter = arr.shift();
        if (!(letter in curr.link)) {
            curr.link[letter] = { bitset: new BitSet(), link: Object.create(null) };
        }        
        curr = curr.link[letter];
        curr.bitset.set(indx);
    }
}

Index.prototype.remove = function (word, indx) {
    
}

Index.prototype.get = function (word) {
    var arr = word.split('');
    
    var curr = this._root;    
    while (arr.length > 0) {
        var letter = arr.shift();
        if (!(letter in curr.link)) {
            return curr.bitset;
        }
        curr = curr.link[letter];
    }
    return curr.bitset;
}

module.exports = Index;

