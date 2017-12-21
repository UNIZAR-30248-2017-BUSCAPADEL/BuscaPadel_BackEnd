// if test function expects second named argument it will be executed
// in async mode and test will be complete only after callback is called
var port = normalizePort(process.env.PORT || '3000');
function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}
if(port === 3000){
    exports['test'] = function(assert, done) {
        var request = require('request');
        //request('http://localhost:3000/api/jugadores', function (error, response, body) {
        request('https://quiet-lowlands-92391.herokuapp.com/api/jugadores', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                assert.equal(response.statusCode, 200, 'all ok');
            }else{
                console.log(error);
            }
        });
        //var http = require('http');
        //var google = http.createClient(3000, 'localhost');
        //var request = google.request('GET', '/', {'host': 'localhost:3000/api/jugadores'});
        //request.end();
        /*
        request.post({
            url: 'http://localhost:3000/api/jugadores',
            body: JSON.stringify({ user:'my_user', password:'my_pass' })}, function(error, response, body){
            assert.equal(response.statusCode, 200, 'all ok');
        });
        request.on('response', function (response) {
            assert.equal(response.statusCode, 302, 'must redirect'); // will log result
            response.setEncoding('utf8');
            response.on('data', function (chunk) {
                assert.notEqual(chunk, 'helo world', 'must be something more inteligent');
                done() // telling test runner that we're done with this test
            })
        })*/
    };
}else{
    exports['test'] = function(assert, done) {
        var request = require('request');
        request('https://quiet-lowlands-92391.herokuapp.com/api/jugadores', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                assert.equal(response.statusCode, 200, 'all ok');
            }else{
                console.log(error);
            }

        });
        //var http = require('http');
        //var google = http.createClient(3000, 'localhost');
        //var request = google.request('GET', '/', {'host': 'localhost:3000/api/jugadores'});
        //request.end();
        /*request.on('response', function (response) {
            assert.equal(response.statusCode, 302, 'must redirect'); // will log result
            response.setEncoding('utf8');
            response.on('data', function (chunk) {
                assert.notEqual(chunk, 'helo world', 'must be something more inteligent');
                done() // telling test runner that we're done with this test
            })
        })*/
    };
}


if (module === require.main) require('test').run(exports);