// if test function expects second named argument it will be executed
// in async mode and test will be complete only after callback is called
var env = process.env.npm_config_prefix;
console.log(process.env.npm_config_prefix);
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
if(env === '/usr/local'){
    exports['test'] = function(assert, done) {
        var request = require('request');
        /*
        //GET jugadores
        request('http://localhost:3000/api/jugadores', function (error, response, body) {
        //request('https://quiet-lowlands-92391.herokuapp.com/api/jugadores', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                assert.equal(response.statusCode, 200, 'GET jugadores OK');
                //GET partidos
                request('http://localhost:3000/api/partidos', function (error, response, body) {
                    //request('https://quiet-lowlands-92391.herokuapp.com/api/jugadores', function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        assert.equal(response.statusCode, 200, 'GET partidos OK');
                        //GET resultados
                        request('http://localhost:3000/api/resultados', function (error, response, body) {
                            //request('https://quiet-lowlands-92391.herokuapp.com/api/jugadores', function (error, response, body) {
                            if (!error && response.statusCode == 200) {
                                assert.equal(response.statusCode, 200, 'GET resultados OK');
                                //GET ligas
                                request('http://localhost:3000/api/ligas', function (error, response, body) {
                                    //request('https://quiet-lowlands-92391.herokuapp.com/api/jugadores', function (error, response, body) {
                                    if (!error && response.statusCode == 200) {
                                        assert.equal(response.statusCode, 200, 'GET ligas OK');
                                    }else{
                                        console.log(error);
                                    }
                                });
                            }else{
                                console.log(error);
                            }
                        });
                    }else{
                        console.log(error);
                    }
                });
            }else{
                console.log(error);
            }
        });
        */
        // Set the headers
        var headers = {
            'User-Agent':       'Super Agent/0.0.1',
            'Content-Type':     'application/x-www-form-urlencoded'
        };

        // Configurar petición para tests de resultados
        var options = {
            url: 'http://localhost:3000/api/partidos',
            method: 'POST',
            headers: headers,
            form: { 'fkIdJugador1': 2, 'fkIdJugador2' : 3, 'fkIdJugador3': 4, 'fkIdJugador4': 5,
                    'lugar': 'Plaza Imperial', 'hora':'08:08:08', 'fecha': '2017-01-01', 'nivel': 6}
        };
        // Comienzo de POST

        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // Print out the response body
                assert.equal(response.statusCode, 200, 'POST partidos OK');
                parsedBody = JSON.parse(body);
                idInsert = parsedBody.insertId;
                //DELETE
                // Configure the request
                var optionsDelete = {
                    url: 'http://localhost:3000/api/partidos/'+idInsert,
                    method: 'DELETE'
                };
                // Start the request
                request(optionsDelete, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        // Print out the response body
                        assert.equal(response.statusCode, 200, 'DELETE partidos OK');
                        //GET ligas de liga borrada
                        request('http://localhost:3000/api/partidos/'+idInsert, function (error, response, body) {
                            //request('https://quiet-lowlands-92391.herokuapp.com/api/jugadores', function (error, response, body) {
                            if (!error && response.statusCode == 200) {
                                parsedBody = JSON.parse(body);
                                vacio = !Object.keys(parsedBody).length;
                                assert.equal(vacio, true, 'Eliminado '+idInsert+' OK');
                            }else{
                                console.log(error);
                            }
                            // Comienzo de POST
                            request(options, function (error, response, body) {
                                if (!error && response.statusCode == 200) {
                                    // Print out the response body
                                    assert.equal(response.statusCode, 200, 'POST partidos OK');
                                    parsedBody = JSON.parse(body);
                                    idInsert = parsedBody.insertId;
                                    //PUT
                                    // Configure the request
                                    var optionsPut = {
                                        url: 'http://localhost:3000/api/partidos/'+idInsert,
                                        method: 'PUT',
                                        headers: headers,
                                        form: { 'fkIdJugador1': 2, 'fkIdJugador2' : 3, 'fkIdJugador3': 4, 'fkIdJugador4': 5,
                                            'lugar': 'Plaza Imperial 2', 'hora':'08:08:08', 'fecha': '2017-01-01', 'nivel': 6}
                                    };
                                    // Start the request
                                    request(optionsPut, function (error, response, body) {
                                        if (!error && response.statusCode == 200) {
                                            // Print out the response body
                                            assert.equal(response.statusCode, 200, 'PUT partidos OK');
                                            //GET ligas de liga borrada
                                            request('http://localhost:3000/api/partidos/'+idInsert, function (error, response, body) {
                                                //request('https://quiet-lowlands-92391.herokuapp.com/api/jugadores', function (error, response, body) {
                                                if (!error && response.statusCode == 200) {
                                                    parsedBody = JSON.parse(body);
                                                    vacio = !Object.keys(parsedBody).length;
                                                    assert.equal(vacio, false, 'Modificado partidos '+idInsert+' OK');
                                                    // Configure the request para tests de ligas
                                                    var options = {
                                                        url: 'http://localhost:3000/api/ligas',
                                                        method: 'POST',
                                                        headers: headers,
                                                        form: { 'nombre': 'ligaPost', 'numJugadores' : 16}
                                                    };
                                                    // Comienzo de POST
                                                    request(options, function (error, response, body) {
                                                        if (!error && response.statusCode == 200) {
                                                            // Print out the response body
                                                            assert.equal(response.statusCode, 200, 'POST ligas OK');
                                                            parsedBody = JSON.parse(body);
                                                            idInsert = parsedBody.insertId;
                                                            //DELETE
                                                            // Configure the request
                                                            var optionsDelete = {
                                                                url: 'http://localhost:3000/api/ligas/'+idInsert,
                                                                method: 'DELETE'
                                                            };
                                                            // Start the request
                                                            request(optionsDelete, function (error, response, body) {
                                                                if (!error && response.statusCode == 200) {
                                                                    // Print out the response body
                                                                    assert.equal(response.statusCode, 200, 'DELETE ligas OK');
                                                                    //GET ligas de liga borrada
                                                                    request('http://localhost:3000/api/ligas/'+idInsert, function (error, response, body) {
                                                                        //request('https://quiet-lowlands-92391.herokuapp.com/api/jugadores', function (error, response, body) {
                                                                        if (!error && response.statusCode == 200) {
                                                                            parsedBody = JSON.parse(body);
                                                                            vacio = !Object.keys(parsedBody).length;
                                                                            assert.equal(vacio, true, 'Eliminado '+idInsert+' OK');
                                                                        }else{
                                                                            console.log(error);
                                                                        }
                                                                        // Comienzo de POST
                                                                        request(options, function (error, response, body) {
                                                                            if (!error && response.statusCode == 200) {
                                                                                // Print out the response body
                                                                                assert.equal(response.statusCode, 200, 'POST ligas OK');
                                                                                parsedBody = JSON.parse(body);
                                                                                idInsert = parsedBody.insertId;
                                                                                //PUT
                                                                                // Configure the request
                                                                                var optionsPut = {
                                                                                    url: 'http://localhost:3000/api/ligas/'+idInsert,
                                                                                    method: 'PUT',
                                                                                    headers: headers,
                                                                                    form: { 'nombre': 'ligaPut', 'numJugadores' : 16}
                                                                                };
                                                                                // Start the request
                                                                                request(optionsPut, function (error, response, body) {
                                                                                    if (!error && response.statusCode == 200) {
                                                                                        // Print out the response body
                                                                                        assert.equal(response.statusCode, 200, 'PUT ligas OK');
                                                                                        //GET ligas de liga modificada
                                                                                        request('http://localhost:3000/api/ligas/'+idInsert, function (error, response, body) {
                                                                                            //request('https://quiet-lowlands-92391.herokuapp.com/api/jugadores', function (error, response, body) {
                                                                                            if (!error && response.statusCode == 200) {
                                                                                                parsedBody = JSON.parse(body);
                                                                                                vacio = !Object.keys(parsedBody).length;
                                                                                                assert.equal(vacio, false, 'Modificado ligas '+idInsert+' OK');
                                                                                                // Configure the request para tests de resultados
                                                                                                var options = {
                                                                                                    url: 'http://localhost:3000/api/resultados',
                                                                                                    method: 'POST',
                                                                                                    headers: headers,
                                                                                                    form: { 'fkIdPartido': 5, 'puntosEquipo1Set1' : 3, 'puntosEquipo1Set2': 6, 'puntosEquipo1Set3': 4,
                                                                                                        'puntosEquipo2Set1': 6, 'puntosEquipo2Set2':4, 'puntosEquipo2Set3': 6}
                                                                                                };
                                                                                                // Comienzo de POST
                                                                                                request(options, function (error, response, body) {
                                                                                                    if (!error && response.statusCode == 200) {
                                                                                                        // Print out the response body
                                                                                                        assert.equal(response.statusCode, 200, 'POST resultados OK');
                                                                                                        parsedBody = JSON.parse(body);
                                                                                                        idInsert = parsedBody.insertId;
                                                                                                        //DELETE
                                                                                                        // Configure the request
                                                                                                        var optionsDelete = {
                                                                                                            url: 'http://localhost:3000/api/resultados/'+idInsert,
                                                                                                            method: 'DELETE'
                                                                                                        };
                                                                                                        // Start the request
                                                                                                        request(optionsDelete, function (error, response, body) {
                                                                                                            if (!error && response.statusCode == 200) {
                                                                                                                // Print out the response body
                                                                                                                assert.equal(response.statusCode, 200, 'DELETE resultados OK');
                                                                                                                //GET ligas de liga borrada
                                                                                                                request('http://localhost:3000/api/resultados/'+idInsert, function (error, response, body) {
                                                                                                                    //request('https://quiet-lowlands-92391.herokuapp.com/api/jugadores', function (error, response, body) {
                                                                                                                    if (!error && response.statusCode == 200) {
                                                                                                                        parsedBody = JSON.parse(body);
                                                                                                                        vacio = !Object.keys(parsedBody).length;
                                                                                                                        assert.equal(vacio, true, 'Eliminado resultado '+idInsert+' OK');
                                                                                                                    }else{
                                                                                                                        console.log(error);
                                                                                                                    }
                                                                                                                    // Comienzo de POST
                                                                                                                    request(options, function (error, response, body) {
                                                                                                                        if (!error && response.statusCode == 200) {
                                                                                                                            // Print out the response body
                                                                                                                            assert.equal(response.statusCode, 200, 'POST resultados OK');
                                                                                                                            parsedBody = JSON.parse(body);
                                                                                                                            idInsert = parsedBody.insertId;
                                                                                                                            //PUT
                                                                                                                            // Configure the request
                                                                                                                            var optionsPut = {
                                                                                                                                url: 'http://localhost:3000/api/resultados/'+idInsert,
                                                                                                                                method: 'PUT',
                                                                                                                                headers: headers,
                                                                                                                                form: { 'fkIdPartido': 5, 'puntosEquipo1Set1' : 3, 'puntosEquipo1Set2': 6, 'puntosEquipo1Set3': 6,
                                                                                                                                    'puntosEquipo2Set1': 6, 'puntosEquipo2Set2':4, 'puntosEquipo2Set3': 7}
                                                                                                                            };
                                                                                                                            // Start the request
                                                                                                                            request(optionsPut, function (error, response, body) {
                                                                                                                                if (!error && response.statusCode == 200) {
                                                                                                                                    // Print out the response body
                                                                                                                                    assert.equal(response.statusCode, 200, 'PUT resultados OK');
                                                                                                                                    //GET ligas de liga modificada
                                                                                                                                    request('http://localhost:3000/api/resultados/'+idInsert, function (error, response, body) {
                                                                                                                                        //request('https://quiet-lowlands-92391.herokuapp.com/api/jugadores', function (error, response, body) {
                                                                                                                                        if (!error && response.statusCode == 200) {
                                                                                                                                            parsedBody = JSON.parse(body);
                                                                                                                                            vacio = !Object.keys(parsedBody).length;
                                                                                                                                            assert.equal(vacio, false, 'Modificado resultado '+idInsert+' OK');
                                                                                                                                        }else{
                                                                                                                                            console.log(error);
                                                                                                                                        }
                                                                                                                                    });
                                                                                                                                }
                                                                                                                            });

                                                                                                                        }
                                                                                                                    });
                                                                                                                });
                                                                                                            }
                                                                                                        });

                                                                                                    }
                                                                                                });
                                                                                            }else{
                                                                                                console.log(error);
                                                                                            }
                                                                                        });
                                                                                    }
                                                                                });

                                                                            }
                                                                        });
                                                                    });
                                                                }
                                                            });

                                                        }
                                                    });
                                                }else{
                                                    console.log(error);
                                                }
                                            });
                                        }
                                    });

                                }
                            });
                        });
                    }
                });

            }
        });


    };
}else{
    exports['test'] = function(assert, done) {
        var request = require('request');
        //GET jugadores
        //request('http://localhost:3000/api/jugadores', function (error, response, body) {
        request('https://quiet-lowlands-92391.herokuapp.com/api/jugadores', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                assert.equal(response.statusCode, 200, 'GET jugadores OK');
            } else {
                console.log(error);
            }
        });
        //GET partidos
        //request('http://localhost:3000/api/partidos', function (error, response, body) {
        request('https://quiet-lowlands-92391.herokuapp.com/api/partidos', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                assert.equal(response.statusCode, 200, 'GET partidos OK');
            } else {
                console.log(error);
            }
        });
        //GET resultados
        //request('http://localhost:3000/api/resultados', function (error, response, body) {
        request('https://quiet-lowlands-92391.herokuapp.com/api/resultados', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                assert.equal(response.statusCode, 200, 'GET resultados OK');
            } else {
                console.log(error);
            }
        });
        //GET ligas
        //request('http://localhost:3000/api/ligas', function (error, response, body) {
        request('https://quiet-lowlands-92391.herokuapp.com/api/ligas', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                assert.equal(response.statusCode, 200, 'GET ligas OK');
            } else {
                console.log(error);
            }
        });

        //GET jugadores
        //request('http://localhost:3000/api/jugadores/1', function (error, response, body) {
        request('https://quiet-lowlands-92391.herokuapp.com/api/jugadores/1', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                assert.equal(response.statusCode, 200, 'GET jugadores/1 OK');
            } else {
                console.log(error);
            }
        });
        //GET partidos
        //request('http://localhost:3000/api/partidos/1', function (error, response, body) {
        request('https://quiet-lowlands-92391.herokuapp.com/api/partidos/1', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                assert.equal(response.statusCode, 200, 'GET partidos/1 OK');
            } else {
                console.log(error);
            }
        });
        //GET resultados
        //request('http://localhost:3000/api/resultados/1', function (error, response, body) {
        request('https://quiet-lowlands-92391.herokuapp.com/api/resultados/1', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                assert.equal(response.statusCode, 200, 'GET resultados/1 OK');
            } else {
                console.log(error);
            }
        });

        // Set the headers
        var headers = {
            'User-Agent': 'Super Agent/0.0.1',
            'Content-Type': 'application/x-www-form-urlencoded'
        };

        // Configure the request
        var options = {
            url: 'https://quiet-lowlands-92391.herokuapp.com/api/ligas',
            method: 'POST',
            headers: headers,
            form: {'nombre': 'ligaPost', 'numJugadores': 16}
        };
        // Comienzo de POST

        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // Print out the response body
                assert.equal(response.statusCode, 200, 'POST ligas OK');
                parsedBody = JSON.parse(body);
                idInsert = parsedBody.insertId;
                //DELETE
                // Configure the request
                var optionsDelete = {
                    url: 'https://quiet-lowlands-92391.herokuapp.com/api/ligas/' + idInsert,
                    method: 'DELETE'
                };
                // Start the request
                request(optionsDelete, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        // Print out the response body
                        assert.equal(response.statusCode, 200, 'DELETE ligas OK');
                        //GET ligas de liga borrada
                        request('https://quiet-lowlands-92391.herokuapp.com/api/ligas/' + idInsert, function (error, response, body) {
                            //request('https://quiet-lowlands-92391.herokuapp.com/api/jugadores', function (error, response, body) {
                            if (!error && response.statusCode == 200) {
                                parsedBody = JSON.parse(body);
                                vacio = !Object.keys(parsedBody).length;
                                assert.equal(vacio, true, 'Eliminado ' + idInsert + ' OK');
                            } else {
                                console.log(error);
                            }
                            // Comienzo de POST
                            request(options, function (error, response, body) {
                                if (!error && response.statusCode == 200) {
                                    // Print out the response body
                                    assert.equal(response.statusCode, 200, 'POST ligas OK');
                                    parsedBody = JSON.parse(body);
                                    idInsert = parsedBody.insertId;
                                    //PUT
                                    // Configure the request
                                    var optionsPut = {
                                        url: 'https://quiet-lowlands-92391.herokuapp.com/api/ligas/' + idInsert,
                                        method: 'PUT',
                                        headers: headers,
                                        form: {'nombre': 'ligaPut', 'numJugadores': 16}
                                    };
                                    // Start the request
                                    request(optionsPut, function (error, response, body) {
                                        if (!error && response.statusCode == 200) {
                                            // Print out the response body
                                            assert.equal(response.statusCode, 200, 'PUT ligas OK');
                                            //GET ligas de liga borrada
                                            request('https://quiet-lowlands-92391.herokuapp.com/api/ligas/' + idInsert, function (error, response, body) {
                                                //request('https://quiet-lowlands-92391.herokuapp.com/api/jugadores', function (error, response, body) {
                                                if (!error && response.statusCode == 200) {
                                                    parsedBody = JSON.parse(body);
                                                    vacio = !Object.keys(parsedBody).length;
                                                    assert.equal(vacio, false, 'Modificado ' + idInsert + ' OK');
                                                } else {
                                                    console.log(error);
                                                }
                                            });
                                        }
                                    });

                                }
                            });
                        });
                    }
                });

            }
        });
    };
}


if (module === require.main) require('test').run(exports);