var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');


var connection = require('./connection');
var Direccion = connection.define('direcciones', {
  ID_Direccion: { // sequelize generate an Id
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Calle: {
    type: Sequelize.STRING,
    allowNull: false
  },
  Numero: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  Ciudad: {
    type: Sequelize.STRING,
    allowNull: false
  },
  Departamento: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  timestamps: false
  //freezeTableName: true #quitar plural automatico de las tablas
});

connection.sync({
  force: true, // drop tables before create them
  logging: console.log
}).then(function() {
  console.log("Data base connection done!");
  // Direccion.create({
  //   Calle: 'test Calle',
  //   Numero: 12,
  //   Ciudad: 'Pereira',
  //   Departamento: 'Risaralda'
  // });
  // Direccion.create({
  //   Calle: 'test Calle 2',
  //   Numero: 13,
  //   Ciudad: 'Pereira',
  //   Departamento: 'Risaralda'
  // });
}, function() {
  console.log("Data base connection failed!");
});

var routes = require('./routes/index');
var users = require('./routes/users');
var api = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/api/v1', api)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
