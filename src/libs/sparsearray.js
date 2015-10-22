/*
	suggester
	Copyright (c) 2015 Yaroslav Gaponov <yaroslav.gaponov@gmail.com>
*/

var NODE = {
    INDEX: 0,
    VALUE: 1,
    NEXT: 2,
    create: function (index, value, next) {
        return [index, value, next]
    }
}

const HASH_TABLE_LENGTH = 13;
const LINKED_LIST_LENGTH = 5;

var _SparseArray = function (options) {
    if (this instanceof _SparseArray) {

        this._hashTableLength = HASH_TABLE_LENGTH;
        this._linkedListLength = LINKED_LIST_LENGTH;
        if (options) {
            if ('hash_table_length' in options) {
                this._hashTableLength = options.hash_table_length;
            }
            if ('linked_list_length' in options) {
                this._linkedListLength = options.linked_list_length;
            }
        }

        this._htable = new Array(this._hashTableLength);
        this._size = 0;
    } else {
        return new _SparseArray(options);
    }
}

_SparseArray.prototype.put = function (index, value) {
    var indx = index % this._htable.length;
    var pred, curr = this._htable[indx];
    while (curr) {
        if (curr[NODE.INDEX] === index) {
            curr[NODE.VALUE] = value;
            return false;
        }
        if (curr[NODE.INDEX] > index) {
            break;
        }
        pred = curr;
        curr = curr[NODE.NEXT];
    }
    if (pred) {
        pred[NODE.NEXT] = NODE.create(index, value, curr);
    } else {
        this._htable[indx] = NODE.create(index, value, curr);
    }
    this._size++;
    return true;
}

_SparseArray.prototype.get = function (index) {
    var indx = index % this._htable.length;
    var curr = this._htable[indx];
    while (curr) {
        if (curr[NODE.INDEX] === index) {
            return curr[NODE.VALUE];
        }
        if (curr[NODE.INDEX] > index) {
            return undefined;
        }
        curr = curr[NODE.NEXT];
    }
    return undefined;
}

_SparseArray.prototype.has = function (index) {
    return Boolean(this.get(index));
}

_SparseArray.prototype.remove = function (index) {
    var indx = index % this._htable.length;
    var pred, curr = this._htable[indx];
    while (curr) {
        if (curr[NODE.INDEX] === index) {
            if (pred) {
                pred[NODE.NEXT] = curr[NODE.NEXT];
            } else {
                this._htable[indx] = curr[NODE.NEXT];
            }
            this._size--;
            return true;
        }
        if (curr[NODE.INDEX] > index) {
            return false;
        }
        pred = curr;
        curr = curr[NODE.NEXT];
    }
    return false;
}

_SparseArray.prototype.forEach = function (iterator) {
    for (var indx = 0; indx < this._htable.length; indx++) {
        var curr = this._htable[indx];
        while (curr) {
            iterator(curr[NODE.INDEX], curr[NODE.VALUE]);
            curr = curr[NODE.NEXT];
        }
    }
}

var SparseArray = module.exports = function (options) {
    if (this instanceof SparseArray) {
        this._sa = new _SparseArray(options);
    } else {
        return new SparseArray(options);
    }
}

SparseArray.prototype.put = function (index, value) {
    if ((this._sa._size / this._sa._hashTableLength) > this._sa._linkedListLength) {
        var sa = new _SparseArray({
            hash_table_length: this._sa._hashTableLength << 1,
            linked_list_length: this._sa._linkedListLength
        });
        this._sa.forEach(function (index, value) {
            sa.put(index, value);
        })
        this._sa = sa;
    }
    return this._sa.put(index, value);
}

SparseArray.prototype.get = function (index) {
    return this._sa.get(index);
}

SparseArray.prototype.has = function (index) {
    return this._sa.has(index);
}

SparseArray.prototype.remove = function (index) {
    return this._sa.remove(index);
}

SparseArray.prototype.forEach = function (iterator) {
    return this._sa.forEach(iterator);
}
