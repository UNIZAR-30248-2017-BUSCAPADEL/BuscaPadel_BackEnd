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
var ligaModel = {};

//obtenemos todas las ligas
ligaModel.getLigas = function(callback)
{
    if (connection)
    {
        connection.query('SELECT * FROM ligas ORDER BY id', function(error, rows) {
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

//obtenemos una liga por su id
ligaModel.getLiga = function(id,callback)
{
    if (connection)
    {
        var sql = 'SELECT * FROM ligas WHERE id = ' + connection.escape(id);
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

//añadir una nueva liga
ligaModel.insertLiga = function(ligaData,callback)
{
    if (connection)
    {
        connection.query('INSERT INTO ligas SET ?', ligaData, function(error, result)
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

//actualizar una liga
ligaModel.updateLiga = function(ligaData, callback)
{
//console.log(userData); return;
    if(connection)
    {
        var sql = 'UPDATE ligas SET nombre = ' + connection.escape(ligaData.nombre) + ',' +
            'numJugadores = ' + connection.escape(ligaData.numJugadores) +
            'WHERE id = ' + ligaData.id;

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

//eliminar una liga pasando la id a eliminar
ligaModel.deleteLiga = function(id, callback)
{
    if(connection)
    {
        var sqlExists = 'SELECT * FROM ligas WHERE id = ' + connection.escape(id);
        connection.query(sqlExists, function(err, row)
        {
//si existe la id del usuario a eliminar
            if(row)
            {
                var sql = 'DELETE FROM ligas WHERE id = ' + connection.escape(id);
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
module.exports = ligaModel;