var BUF_MAX_SIZE = {
    ia32: 0x1fffffff,
    x64: 0x3fffffff
}

function Rank() {
    this._ranks = new Buffer(BUF_MAX_SIZE[process.arch]);
    this._ranks.fill(0);
}

Rank.prototype.increase = function (indx) {
    return ++this._ranks[indx]
}

Rank.prototype.decrease = function (indx) {
    return --this._ranks[indx]
}

Rank.prototype.get = function (indx) {
    return this._ranks[indx]
}

module.exports = Rank