/*
 suggester
 Copyright (c) 2015 Yaroslav Gaponov <yaroslav.gaponov@gmail.com>
*/

function Rank() {
    this._ranks = []
}

Rank.prototype.increase = function (indx) {
    return this._ranks[indx] = (this._ranks[indx] || 0) + 1
}

Rank.prototype.decrease = function (indx) {
    return this._ranks[indx] = (this._ranks[indx] || 0) - 1
}

Rank.prototype.get = function (indx) {
    return this._ranks[indx] || 0
}

module.exports = Rank
