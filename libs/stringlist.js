/*
    Suggester
    Copyright (c) 2015 Yaroslav Gaponov <yaroslav.gaponov@gmail.com>
*/

var assert = require('assert');

var FreeBlock = require('./freeblock');

var BUF_MAX_SIZE = {
    ia32: 0x1fffffff,
    x64: 0x3fffffff
}

function StringList(size) {
    size = isNaN(size) ? BUF_MAX_SIZE[process.arch] : Number(size);

    assert(size > 0);
    assert(size <= BUF_MAX_SIZE[process.arch]);

    this._offsets = [];
    this._lastOffset = 0;
    this._lengths = [];
    this._freeIndices = [];
    this._freeBlock = new FreeBlock();
    this._memory = new Buffer(size);
}

StringList.prototype.clear = function () {
    this._offsets = [];
    this._lastOffset = 0;
    this._lengths = [];
}

StringList.prototype.add = function (s) {

    var indx = this._freeBlock.fetch(s.length);
    if (indx === -1) {
        indx = this._offsets.length;
    }

    this._offsets.push(this._lastOffset);

    for (var i = 0; i < s.length; i++) {
        this._memory.writeInt16LE(s.charCodeAt(i), this._lastOffset);
        this._lastOffset += 2;
    }

    this._lengths.push(s.length)

    return indx;
}

StringList.prototype.remove = function (indx) {
    if (this._freeIndices.indexOf(indx) === -1) {
        this._freeIndices.push(indx);
        this._freeBlock.insert(this._offsets[indx], this._lengths[indx])
    }
}

StringList.prototype.get = function (indx) {
    assert(indx < this._offsets.length);

    if (this._freeIndices.indexOf(indx) !== -1) {
        return null;
    }

    var offset = this._offsets[indx];
    var s = [];
    for (var i = 0; i < this._lengths[indx]; i++) {
        s.push(String.fromCharCode(this._memory.readInt16LE(offset)));
        offset += 2;
    }
    return s.join('');
}

StringList.prototype.length = function () {
    return this._offsets.length - this._freeIndices.length;
}

module.exports = StringList;
