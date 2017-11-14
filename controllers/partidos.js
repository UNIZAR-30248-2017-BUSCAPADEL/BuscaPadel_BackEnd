var PartidoModel = require('../models/partidos');

//GET - Return all registers
exports.findAll = function(req, res) {
    PartidoModel.getPartidos(function(err, clients) {
        if(err) res.send(500, err.message);
        console.log('GET /partidos')
        res.status(200).jsonp(clients);
    });
};

//GET - Return a register with specified ID
exports.findById = function(req, res) {
    PartidoModel.getPartido(req.params.id, function(err, client) {
        if(err) return res.send(500, err.message);
        console.log('GET /partidos/' + req.params.id);
        res.status(200).jsonp(client);
    });
};

//POST - Insert a new register
exports.add = function(req, res) {
    console.log('POST');
    var partido = {
        id: req.body.id,
        fkIdJugador1: req.body.fkIdJugador1,
        fkIdJugador2: req.body.fkIdJugador2,
        fkIdJugador3: req.body.fkIdJugador3,
        fkIdJugador4: req.body.fkIdJugador4,
        lugar: req.body.lugar,
        hora: req.body.hora,
        fecha: req.body.fecha,
        nivel: req.body.nivel
    };
    PartidoModel.insertPartido(partido, function(err, client) {
        if(err) return res.send(500, err.message);
        res.status(200).jsonp(client);
    });
};

//PUT - Update a register already exists
exports.update = function(req, res) {
    PartidoModel.getPartido(req.params.id, function(err, partido) {
        var partido = {
            id: req.params.id,
            fkIdJugador1: req.body.fkIdJugador1,
            fkIdJugador2: req.body.fkIdJugador2,
            fkIdJugador3: req.body.fkIdJugador3,
            fkIdJugador4: req.body.fkIdJugador4,
            lugar: req.body.lugar,
            hora: req.body.hora,
            fecha: req.body.fecha,
            nivel: req.body.nivel
        };
        PartidoModel.updatePartido(partido, function(err) {
            if(err) return res.send(500, err.message);
            res.status(200).jsonp(partido);
        });
    });
};

//DELETE - Delete a register with specified ID
exports.delete = function(req, res) {
    PartidoModel.deletePartido(req.params.id, function(err, partido) {
        if(err) return res.send(500, err.message);
        res.json({ message: 'Successfully deleted' });
    });
};

//ADD PLAYER TO MATCH
exports.addPlayer = function(req, res) {
    PartidoModel.getPartido(req.params.id, function(err, partido) {
        var partido = {
            id: req.params.id,
            fkIdJugador1: req.body.fkIdJugador1
        };
        PartidoModel.addPlayer(partido, function(err) {
            if(err) return res.send(500, err.message);
            res.status(200).jsonp(partido);
        });
    });
};