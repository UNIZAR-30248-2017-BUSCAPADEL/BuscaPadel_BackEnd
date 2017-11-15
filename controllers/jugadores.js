var JugadorModel = require('../models/jugadores');

//GET - Return all registers
exports.findAll = function(req, res) {
    JugadorModel.getJugadores(function(err, clients) {
        if(err) res.send(500, err.message);
        console.log('GET /partidos')
        res.status(200).jsonp(clients);
    });
};

//GET - Return a register with specified ID
exports.findById = function(req, res) {
    JugadorModel.getJugador(req.params.id, function(err, client) {
        if(err) return res.send(500, err.message);
        console.log('GET /partidos/' + req.params.id);
        res.status(200).jsonp(client);
    });
};

//POST - Insert a new register
exports.add = function(req, res) {
    console.log('POST');
    console.log(req.body);
    var jugador = {
        id: req.body.id,
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        correo: req.body.correo,
        nivel: req.body.nivel
    };
    JugadorModel.insertJugador(jugador, function(err, client) {
        if(err) return res.send(500, err.message);
        res.status(200).jsonp(client);
    });
};

//PUT - Update a register already exists
exports.update = function(req, res) {
    JugadorModel.getJugador(req.params.id, function(err, partido) {
        console.log(req.body);
        var jugador = {
            id: req.params.id,
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            correo: req.body.correo,
            nivel: req.body.nivel
        };
        JugadorModel.updateJugador(jugador, function(err) {
            if(err) return res.send(500, err.message);
            res.status(200).jsonp(jugador);
        });
    });
};

//DELETE - Delete a register with specified ID
exports.delete = function(req, res) {
    JugadorModel.deleteJugador(req.params.id, function(err, partido) {
        if(err) return res.send(500, err.message);
        res.json({ message: 'Successfully deleted' });
    });
};

//PUT - SET LEVEL PLAYER
exports.setLevel = function(req, res) {
    JugadorModel.getJugador(req.params.id, function(err, partido) {
        var jugador = {
            id: req.params.id,
            nivel: req.body.nivel
        };
        JugadorModel.addLevel(jugador, function(err) {
            if(err) return res.send(500, err.message);
            res.status(200).jsonp(jugador);
        });
    });
};

exports.registro = function (req, res) {
    JugadorModel.getRegistro(req.params.correo, function(err, jugador) {
        if(err) return res.send(500, err.message);
        res.status(200).jsonp(jugador);
    });
};