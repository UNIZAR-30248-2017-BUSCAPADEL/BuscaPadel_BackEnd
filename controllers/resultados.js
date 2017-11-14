var ResultadoModel = require('../models/resultados');

//GET - Return all registers
exports.findAll = function(req, res) {
    ResultadoModel.getResultados(function(err, clients) {
        if(err) res.send(500, err.message);
        console.log('GET /resultados')
        res.status(200).jsonp(clients);
    });
};

//GET - Return a register with specified ID
exports.findById = function(req, res) {
    ResultadoModel.getResultado(req.params.id, function(err, client) {
        if(err) return res.send(500, err.message);
        console.log('GET /resultados/' + req.params.id);
        res.status(200).jsonp(client);
    });
};

//POST - Insert a new register
exports.add = function(req, res) {
    console.log('POST');
    var resultado = {
        id: req.body.id,
        fkIdPartido: req.body.fkIdPartido,
        puntosEquipo1Set1: req.body.puntosEquipo1Set1,
        puntosEquipo1Set2: req.body.puntosEquipo1Set2,
        puntosEquipo1Set3: req.body.puntosEquipo1Set3,
        puntosEquipo2Set1: req.body.puntosEquipo2Set1,
        puntosEquipo2Set2: req.body.puntosEquipo2Set2,
        puntosEquipo2Set3: req.body.puntosEquipo2Set3
    };
    ResultadoModel.insertResultado(resultado, function(err, client) {
        if(err) return res.send(500, err.message);
        res.status(200).jsonp(client);
    });
};

//PUT - Update a register already exists
exports.update = function(req, res) {
    ResultadoModel.getResultado(req.params.id, function(err, partido) {
        console.log(req.body);
        var resultado = {
            id: req.body.id,
            fkIdPartido: req.body.fkIdPartido,
            puntosEquipo1Set1: req.body.puntosEquipo1Set1,
            puntosEquipo1Set2: req.body.puntosEquipo1Set2,
            puntosEquipo1Set3: req.body.puntosEquipo1Set3,
            puntosEquipo2Set1: req.body.puntosEquipo2Set1,
            puntosEquipo2Set2: req.body.puntosEquipo2Set2,
            puntosEquipo2Set3: req.body.puntosEquipo2Set3
        };
        ResultadoModel.updateResultado(resultado, function(err) {
            if(err) return res.send(500, err.message);
            res.status(200).jsonp(resultado);
        });
    });
};

//DELETE - Delete a register with specified ID
exports.delete = function(req, res) {
    ResultadoModel.deleteResultado(req.params.id, function(err, partido) {
        if(err) return res.send(500, err.message);
        res.json({ message: 'Successfully deleted' });
    });
};
