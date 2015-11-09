/*
    Suggester
    Copyright (c) 2015 Yaroslav Gaponov <yaroslav.gaponov@gmail.com>
*/

function QueuePriority() {
    this._queue = [];
}

QueuePriority.prototype.clean = function () {
    this._queue = [];
}

QueuePriority.prototype.insert = function (key) {
    this._queue.push(key);
}

QueuePriority.prototype.remove = function (key) {
    var indx = this._queue.indexOf(key);
    if (indx !== -1) {
        this._queue.splice(indx, 1);
    }
}

QueuePriority.prototype.update = function (key) {
    this.remove(key);
    this.insert(key);
}

QueuePriority.prototype.extract = function () {
    return this._queue.shift();
}

function LruCache(size) {
    this._size = size || 64;
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
        this._queue.update(key);
    } else {
        this._queue.insert(key);
    }

    if (this._length > this._size) {
        var k = this._queue.extract();
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
        this._queue.update(key);
        return this._map[key];
    }
}

module.exports = LruCache;
