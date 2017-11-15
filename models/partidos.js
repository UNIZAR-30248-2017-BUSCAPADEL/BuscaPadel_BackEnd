var mysql = require('mysql');
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
        //creamos la conexion a nuestra base de datos con los datos de acceso de cada uno
        connection = mysql.createConnection(
            {
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'buscapadel'
            }
        );
    }else{
        connection = mysql.createConnection(
            {
                host: 'us-cdbr-iron-east-05.cleardb.net',
                user: 'bd017a21c402e9',
                password: 'dba55194821a283',
                database: 'heroku_815057acb052552'
            }
        );
    }

//creamos un objeto para ir almacenando todo lo que necesitemos
var partidosModel = {};

//obtenemos todos los partidos
partidosModel.getPartidos = function(callback)
{
    if (connection)
    {
        connection.query('SELECT * FROM partidos ORDER BY id', function(error, rows) {
            if(error)
            {
                throw error;
            }
            else
            {
                callback(null, rows);
            }
        });
    }
}

//obtenemos un partido por su id
partidosModel.getPartido = function(id,callback)
{
    if (connection)
    {
        var sql = 'SELECT * FROM partidos WHERE id = ' + connection.escape(id);
        connection.query(sql, function(error, row)
        {
            if(error)
            {
                throw error;
            }
            else
            {
                callback(null, row);
            }
        });
    }
}

//añadir un nuevo partido
partidosModel.insertPartido = function(partidoData,callback)
{
    if (connection)
    {
        console.log(partidoData);
        connection.query('INSERT INTO partidos SET ?', partidoData, function(error, result)
        {
            if(error)
            {
                throw error;
            }
            else
            {
                //devolvemos la última id insertada
                callback(null,{"insertId" : result.insertId});
            }
        });
    }
}

//actualizar un partido
partidosModel.updatePartido = function(partidoData, callback)
{
//console.log(userData); return;
    if(connection)
    {
        var sql = 'UPDATE partidos SET fkIdJugador1 = ' + connection.escape(partidoData.fkIdJugador1) + ',' +
            'fkIdJugador2 = ' + connection.escape(partidoData.fkIdJugador2)  + ',' + 'fkIdJugador3 = ' + connection.escape(partidoData.fkIdJugador3) + ',' +
            'fkIdJugador4 = ' + connection.escape(partidoData.fkIdJugador4)  + ',' + 'lugar = ' + connection.escape(partidoData.lugar) + ',' +
            'hora = ' + connection.escape(partidoData.hora)  + ',' + 'fecha = ' + connection.escape(partidoData.fecha) + ',' +
            'nivel = ' + connection.escape(partidoData.nivel)  +
            'WHERE id = ' + partidoData.id

        connection.query(sql, function(error, result)
        {
            if(error)
            {
                throw error;
            }
            else
            {
                callback(null,{"msg":"success"});
            }
        });
    }
}

//eliminar un partido pasando la id a eliminar
partidosModel.deletePartido= function(id, callback)
{
    if(connection)
    {
        var sqlExists = 'SELECT * FROM partidos WHERE id = ' + connection.escape(id);
        connection.query(sqlExists, function(err, row)
        {
//si existe la id del usuario a eliminar
            if(row)
            {
                var sql = 'DELETE FROM partidos WHERE id = ' + connection.escape(id);
                connection.query(sql, function(error, result)
                {
                    if(error)
                    {
                        throw error;
                    }
                    else
                    {
                        callback(null,{"msg":"deleted"});
                    }
                });
            }
            else
            {
                callback(null,{"msg":"notExist"});
            }
        });
    }
}

//añadir jugador a partido
partidosModel.addPlayer = function(partidoData, callback)
{
    if(connection)
    {
        console.log(partidoData);
        var sqlExists = 'SELECT fkIdJugador1 FROM partidos WHERE id = ' + connection.escape(partidoData.id);
        connection.query(sqlExists, function(err, row)
        {
            if(row[0].fkIdJugador1 !== null)
            {
                var sqlExists = 'SELECT fkIdJugador2 FROM partidos WHERE id = ' + connection.escape(partidoData.id);
                connection.query(sqlExists, function(err, row) {
                    if (row[0].fkIdJugador2 !== null) {
                        var sqlExists = 'SELECT fkIdJugador3 FROM partidos WHERE id = ' + connection.escape(partidoData.id);
                        connection.query(sqlExists, function(err, row) {
                            if (row[0].fkIdJugador3 !== null) {
                                var sqlExists = 'SELECT fkIdJugador4 FROM partidos WHERE id = ' + connection.escape(partidoData.id);
                                connection.query(sqlExists, function(err, row) {
                                    if (row[0].fkIdJugador4 !== null) {
                                        callback(null,{"msg":"match Complete"});
                                    }else{
                                        var sql = 'UPDATE partidos SET fkIdJugador4 = ' + connection.escape(partidoData.fkIdJugador1)  + ' WHERE id = ' + connection.escape(partidoData.id);
                                        connection.query(sql, function(error, result)
                                        {
                                            if(error)
                                            {
                                                throw error;
                                            }
                                            else
                                            {
                                                callback(null,{"msg":"deleted"});
                                            }
                                        });
                                    }
                                });
                            }else{
                                var sql = 'UPDATE partidos SET fkIdJugador3 = ' + connection.escape(partidoData.fkIdJugador1)  + ' WHERE id = ' + connection.escape(partidoData.id);
                                connection.query(sql, function(error, result)
                                {
                                    if(error)
                                    {
                                        throw error;
                                    }
                                    else
                                    {
                                        callback(null,{"msg":"deleted"});
                                    }
                                });
                            }
                        });
                    }else{
                        var sql = 'UPDATE partidos SET fkIdJugador2 = ' + connection.escape(partidoData.fkIdJugador1)  + ' WHERE id = ' + connection.escape(partidoData.id);
                        connection.query(sql, function(error, result)
                        {
                            if(error)
                            {
                                throw error;
                            }
                            else
                            {
                                callback(null,{"msg":"deleted"});
                            }
                        });
                    }
                });

            }
            else {
                var sql = 'UPDATE partidos SET fkIdJugador1 = ' + connection.escape(partidoData.fkIdJugador1)  + ' WHERE id = ' + connection.escape(partidoData.id);
                connection.query(sql, function(error, result)
                {
                    if(error)
                    {
                        throw error;
                    }
                    else
                    {
                        callback(null,{"msg":"deleted"});
                    }
                });
            }
        });
    }
}

//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = partidosModel;