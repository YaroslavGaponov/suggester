/*
    Suggester
    Copyright (c) 2015 Yaroslav Gaponov <yaroslav.gaponov@gmail.com>
*/

function StandardAnalyzer(text) {
    return text
        .split(/[\s\.\,\-]+/)
        .filter(Boolean)
        .map(function (s) {
            return s.replace(/[\s]+/,' ').toLowerCase()
        })
        .filter(function (s) {
            return s && s.length > 0
        })

}

module.exports = StandardAnalyzer;
