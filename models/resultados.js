//llamamos al paquete mysql que hemos instalado
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
var resultModel = {};

//obtenemos todos los jugadores
resultModel.getResultados = function(callback)
{
    if (connection)
    {
        connection.query('SELECT * FROM resultados ORDER BY id', function(error, rows) {
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

//obtenemos un jugador por su id
resultModel.getResultado = function(id,callback)
{
    if (connection)
    {
        var sql = 'SELECT * FROM resultados WHERE id = ' + connection.escape(id);
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

//añadir un nuevo jugador
resultModel.insertResultado = function(resultData,callback)
{
    console.log(resultData);
    if (connection)
    {
        connection.query('INSERT INTO resultados SET ?', resultData, function(error, result)
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

//actualizar un usuario
resultModel.updateResultado = function(resultData, callback)
{
//console.log(userData); return;
    if(connection)
    {
        var sql = 'UPDATE resultados SET fkIdPartido = ' + connection.escape(resultData.fkIdPartido) + ',' +
            'puntosEquipo1Set1 = ' + connection.escape(resultData.puntosEquipo1Set1) +',' +
            'puntosEquipo1Set2 = ' + connection.escape(resultData.puntosEquipo1Set2) +',' +
            'puntosEquipo1Set3 = ' + connection.escape(resultData.puntosEquipo1Set3) +',' +
            'puntosEquipo2Set1 = ' + connection.escape(resultData.puntosEquipo2Set1) +',' +
            'puntosEquipo2Set2 = ' + connection.escape(resultData.puntosEquipo2Set2) +',' +
            'puntosEquipo2Set3 = ' + connection.escape(resultData.puntosEquipo2Set3) +
            ' WHERE id = ' + resultData.id;
        console.log(sql);
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

//eliminar un usuario pasando la id a eliminar
resultModel.deleteResultado = function(id, callback)
{
    if(connection)
    {
        var sqlExists = 'SELECT * FROM resultados WHERE id = ' + connection.escape(id);
        connection.query(sqlExists, function(err, row)
        {
//si existe la id del usuario a eliminar
            if(row)
            {
                var sql = 'DELETE FROM resultados WHERE id = ' + connection.escape(id);
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

//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = resultModel;