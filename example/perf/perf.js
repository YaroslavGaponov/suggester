var Suggester = (function() {
  try {
    return require('suggester');
  } catch(e) {
    return require('../..');
  }  
})();

var sugg = new Suggester();

console.log('create suggest index...');
for(var i=0; i<100000; i++) {
    sugg.add(Math.random().toString(34).slice(2).slice(0, 12));
}

console.log('search...');
var text = Math.random().toString(34).slice(2).split('');
var len = text.length;
var time = process.hrtime();
while(text.length > 0) {
    sugg.search(text.pop());
}
var diff = process.hrtime(time);
console.log('middle speed for search %d ms', (diff[0] * 1e6 + diff[1] * 1e-3) / len);
