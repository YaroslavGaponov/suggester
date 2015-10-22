# Suggester

library for create suggest index

## Usage

javascript

```js
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
```sh
[ 'hello city', 'hello village', 'hello world' ]
```

## License
MIT Copyright (c) 2015 Yaroslav Gaponov <yaroslav.gaponov@gmail.com>