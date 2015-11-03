var Suggester = (function() {
  try {
    return require('suggester');
  } catch(e) {
    return require('../..');
  }  
})();
var suggester = new Suggester();
suggester.add('hello world');
suggester.add('hello city');
suggester.add('hello city');
suggester.add('hello city');
suggester.add('hello village');
suggester.add('hello village');
console.log(suggester.search('hell'));
console.log(suggester.search('h v'));
console.log(suggester.search('v h'));