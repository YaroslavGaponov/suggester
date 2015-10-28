/*
    Suggester
    Copyright (c) 2015 Yaroslav Gaponov <yaroslav.gaponov@gmail.com>
*/

function QueuePriority() {
    this._root = null;
}

QueuePriority.prototype.clean = function () {
    this._root = null;
}

QueuePriority.prototype.set = function (key) {
    var curr = this._root;
    var pred;
    while (curr) {
        if (curr.key === key) {
            if (pred) {
                pred.next = curr.next;
            } else {
                this._root = curr.next;
            }
        }
        pred = curr;
        curr = curr.next;
    }
    if (pred) {
        pred.next = {
            key: key,
            priority: process.uptime(),
            next: null
        }
    } else {
        this._root = {
            key: key,
            priority: process.uptime(),
            next: null
        }
    }
}

QueuePriority.prototype.remove = function (key) {
    var curr = this._root;
    var pred;
    while (curr) {
        if (curr.key === key) {
            if (pred) {
                pred.next = curr.next;
            } else {
                this._root = curr.next;
            }
            return;
        }
        pred = curr;
        curr = curr.next;
    }
}

QueuePriority.prototype.extractMinValue = function () {
    if (this._root) {
        var key = this._root.key;
        this._root = this._root.next;
        return key;
    }
}

function LruCache(size) {
    this._size = size || 128;
    this._map = Object.create(null);
    this._queue = new QueuePriority();
    this._length = 0;
}

LruCache.prototype.clean = function () {
    this._map = Object.create(null);
    this._queue.clean();
    this._length = 0;
}

LruCache.prototype.add = function (key, value) {

    if (!(key in this._map)) {
        this._length++;
        this._map[key] = value;
    }

    this._queue.set(key);

    if (this._length > this._size) {
        var k = this._queue.extractMinValue();
        delete this._map[k];
        this._length--;
    }

    return value;
}

LruCache.prototype.remove = function (key) {
    if (key in this._map) {
        delete this._map[key];
        this._queue.remove(key);
        this._length--;
    }
}

LruCache.prototype.get = function (key) {
    if (key in this._map) {
        this._queue.set(key);
        return this._map[key];
    }
}

module.exports = LruCache;
