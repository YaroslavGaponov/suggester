/*
    Suggester
    Copyright (c) 2015 Yaroslav Gaponov <yaroslav.gaponov@gmail.com>
*/

function SortedArray(array) {
    if (this instanceof SortedArray) {
        this._array = array || [];
    } else {
        return new SortedArray(array);
    }
}

SortedArray.prototype.add = function (value) {
    if (this.indexOf(value) === -1) {
        var array = new Array(this._array.length + 1);
        var i = 0;
        for (; i < this._array.length; i++) {
            if (this._array[i] < value) {
                array[i] = this._array[i];
            } else {
                break;
            }
        }
        array[i] = value;
        for (; i < this._array.length; i++) {
            array[i + 1] = this._array[i];
        }
        this._array = array;
    }
    return this;
}

SortedArray.prototype.remove = function (value) {
    var indx = this.indexOf(value);
    if (indx !== -1) {
        this._array.splice(indx,1);
    }

    return this;
}

SortedArray.prototype.indexOf = function (value) {
    var left = 0;
    var right = this._array.length;

    while (left < right){
        var mid = left + ((right - left) >>> 1);
        if (value === this._array[mid]) {
            return mid;
        } else if (value < this._array[mid]){
            right = mid;
        } else {
            left = mid + 1;
        }
    }

    return -1;
}

SortedArray.prototype.OR = function (sa) {
    for (var i = 0; i < sa._array.length; i++) {
        if (this.indexOf(sa._array[i]) === -1) {
            this.add(sa._array[i]);
        }
    }
    return this;
}

SortedArray.prototype.AND = function (sa) {
    var result = new SortedArray();
    for (var i = 0; i < this._array.length; i++) {
        if (sa.indexOf(this._array[i]) !== -1) {
            result.add(this._array[i]);
        }
    }
    this._array = result.asArray();
    return this;
}

SortedArray.prototype.asArray = function () {
    return this._array.slice(0);
}

SortedArray.prototype.map = function (cb) {
    return this._array.map(cb);
}

module.exports = SortedArray;
