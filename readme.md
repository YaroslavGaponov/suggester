# Suggester [![Build Status](https://travis-ci.org/YaroslavGaponov/suggester.png?branch=master)](https://travis-ci.org/YaroslavGaponov/suggester)

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
npm install
PORT=58468 node server.js 
```

##### Wait
```sh
[gap@localhost web]$ PORT=58468 node server.js 
   info  - socket.io started
Downloading data about packages...
Creating suggest index...
Please open http://localhost:58468
Loaded  500  docs
Loaded  1000  docs
...
```
##### Open website
```sh
xdg-open http://localhost:58468
```
##### Result
![alt text](https://github.com/YaroslavGaponov/suggester/raw/master/example.png "Example")

## API
[api.md](api.md)

## License
MIT Copyright (c) 2015 Yaroslav Gaponov <yaroslav.gaponov@gmail.com>