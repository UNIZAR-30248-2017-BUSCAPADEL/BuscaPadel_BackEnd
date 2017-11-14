var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
//app.use('/partidos', partidos);
var PartidosCtrl = require('./controllers/partidos');
var JugadoresCtrl = require('./controllers/jugadores');
var ResultadosCtrl = require('./controllers/resultados');
// API routes
var api = express.Router();

api.route('/partidos')
    .get(PartidosCtrl.findAll)
    .post(PartidosCtrl.add);

api.route('/partidos/:id')
    .get(PartidosCtrl.findById)
    .put(PartidosCtrl.update)
    .delete(PartidosCtrl.delete);

api.route('/partido/:id')
    .put(PartidosCtrl.addPlayer);

api.route('/jugadores')
    .get(JugadoresCtrl.findAll)
    .post(JugadoresCtrl.add);

api.route('/jugadores/:id')
    .get(JugadoresCtrl.findById)
    .put(JugadoresCtrl.update)
    .delete(JugadoresCtrl.delete);
api.route('/nivel/:id')
    .put(JugadoresCtrl.setLevel);

api.route('/resultados')
    .get(ResultadosCtrl.findAll)
    .post(ResultadosCtrl.add);

api.route('/resultados/:id')
    .get(ResultadosCtrl.findById)
    .put(ResultadosCtrl.update)
    .delete(ResultadosCtrl.delete);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
