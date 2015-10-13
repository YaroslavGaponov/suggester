var Suggester = require('..');
var sugg = new Suggester();

for(var i=0; i<10000; i++) {
    sugg.add(Math.random().toString(34).slice(2));
}

var text = Math.random().toString(34).slice(2).split('');
var len = text.length;
var time = process.hrtime();
while(text.length > 0) {
    sugg.search(text.pop());
}
var diff = process.hrtime(time);
console.log('middle speed for search %d ms', (diff[0] * 1e6 + diff[1] * 1e-3) / len);
