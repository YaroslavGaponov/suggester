/*
    Suggester
    Copyright (c) 2015 Yaroslav Gaponov <yaroslav.gaponov@gmail.com>
*/

function Rank() {
    this._ranks = []
}

Rank.prototype.increase = function (indx) {
    return this._ranks[indx] = (this._ranks[indx] || 0) + 1
}

Rank.prototype.decrease = function (indx) {
    return this._ranks[indx] = (this._ranks[indx] || 1) - 1
}

Rank.prototype.get = function (indx) {
    return this._ranks[indx] || 0
}

Rank.prototype.set = function (indx, rank) {
    this._ranks[indx] = rank;
}

module.exports = Rank;
