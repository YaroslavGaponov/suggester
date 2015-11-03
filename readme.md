# Suggester

    library for create suggest index

## Usage

###### code

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

###### result
```js
[ 'hello city', 'hello village', 'hello world' ]
```

## Example
    Autocomplete for NPM packages

##### Run server
```sh
cd example\web
node ./server.js
```

##### Wait
```sh
[gap@localhost web]$ node server.js 
   info  - socket.io started
Downloading data about packages...
Creating suggest index...
Please open http://localhost:41257
Loaded  500  docs
Loaded  1000  docs
...
```
##### Open website
```sh
xdg-open http://localhost:41257
```

## License
MIT Copyright (c) 2015 Yaroslav Gaponov <yaroslav.gaponov@gmail.com>