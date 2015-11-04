var express = require('express');
var http = require('http');
var https = require('https');

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

app.set('view engine', 'jade');
app.get('/', function (req, res) {
  res.render('index');
});

var Suggester = (function () {
  try {
    return require('suggester');
  } catch (e) {
    return require('../..');
  }
})();

var suggester = new Suggester();

function getPackageList(done) {
  https.get('https://skimdb.npmjs.com/registry/_all_docs', function (res) {
    var data = ''
    res
      .on('data', function (chunk) {
        data += chunk.toString()
      })
      .on('end', function () {
              var result = JSON.parse(data);
              done(null, result.rows.map(function (e) {
                return e.key
              }))
      })
  })
  .on('error', done);
}

function start() {
	console.log('Downloading data about packages...');
	getPackageList(function (error, result) {
		if (error) {
                  console.log(error);
                  return;
		}
		console.log('Creating suggest index...');
		var counter = 0;
		var timerID = setInterval(function () {
                  if (result.length > 0) {
                    suggester.add(result.shift());
                    if ((++counter % 500) === 0) {
                      console.log('Loaded ', counter, ' docs...');
                    }
                  } else {
                    clearInterval(timerID);
                    console.log('Done');
                  }
		}, 5)
		var listener = server.listen(process.env.PORT || 7777, function () {
                  console.log('Please open http://localhost:' + listener.address().port);
		});
	})
}

io.sockets.on('connection', function (socket) {
	socket.on('req_suggest', function (term) {
          socket.emit('res_suggest', suggester.search(term));
	});
});

start();
