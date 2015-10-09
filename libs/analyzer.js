
function StandardAnalyzer(text) {
    return text
        .split(/[\s\.\,]+/)
        .filter(Boolean)
        .map(function(s) {
            return s.replace(/[\s]+/,' ')
        })
        .filter(function(s) {
            return s && s.length > 0
        })
        
}

module.exports = StandardAnalyzer;