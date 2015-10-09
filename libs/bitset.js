
function BitSet () {
    this._data = Object.create(null);
}

BitSet.prototype.set = function(indx) {

    var base  = indx >>> 5;
    var offset = indx & 0x1f;
    
    if (base in this._data) {
        this._data[base] |= 1 << offset;
    } else {
        this._data[base] = 1 << offset;
    }
}

BitSet.prototype.forEach = function(cb) {
    for(var base in this._data) {
        var bits = this._data[base];
        var indx = 0;
        do {
            if ((bits & 1) === 1) {
                cb((+base<<5)+indx)
            }
            bits >>>= 1
            indx++
        } while (bits !== 0)
    }
}

BitSet.prototype.map = function (cb) {
    var arr = [];
    this.forEach(function(el) {
        arr.push(cb(el));
    })
    return arr;
}

BitSet.prototype.AND = function(bitSet) {
    for (var base in this._data) {
        if (!(base in bitSet._data)) {
            delete this._data[base]
        }
    }
    for(var base in bitSet._data) {
        if (base in this._data) {
            this._data[base] &= bitSet._data[base]
            if (this._data[base] === 0) {
                delete this._data[base]
            }
        }
    }
    return this;
}

BitSet.clone = function(bitSet) {
    var tmp = new BitSet();
    for(var base in bitSet._data) {
        tmp._data[base] = bitSet._data[base]
    }
    return tmp;
}

module.exports = BitSet;
