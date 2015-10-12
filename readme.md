Suggester
========

library for create suggest index

Example
========

javascript

```javascript
var Suggester = require('suggester');
var suggester = new Suggester();
suggester.add('hello world');
suggester.add('hello city');
suggester.add('hello city');
suggester.add('hello city');
suggester.add('hello village');
suggester.add('hello village');
console.log(suggester.search('hell'));
```

output
```output
[ 'hello city', 'hello village', 'hello world' ]
```