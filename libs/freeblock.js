/*
    Suggester
    Copyright (c) 2015 Yaroslav Gaponov <yaroslav.gaponov@gmail.com>
*/

function FreeBlock() {
    this._root = null;
}

FreeBlock.prototype.insert = function (offset, length) {
    var pred, curr;
    curr = this._root;
    while (curr) {
        if (curr.length > length) {
            break;
        }
        pred = curr;
        curr = curr.next;
    }
    if (pred) {
        pred.next = {
            offset: offset,
            length: length,
            next: curr
        }
    } else {
        this._root = {
            offset: offset,
            length: length,
            next: curr
        }
    }
}

FreeBlock.prototype.fetch = function (length) {
    var pred, curr;
    curr = this._root;
    while (curr) {
        if (curr.length >= length) {
            pred.next = curr.next;
            return curr.offset;
        }
        pred = curr;
        curr = curr.next;
    }
    return -1;
}

module.exports = FreeBlock;
