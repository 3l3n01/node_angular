
/**
 * Module dependencies.
 */
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Simulacion de Base de Datos
var db_users = [];

var User = require('./routes/user');
var user = new User(db_users);

app.get('/', routes.index);
app.get('/users', user.getUsers);
app.get('/user/:id', user.getUser);
app.post('/user', user.addUser);
app.put('/user', user.updateUser);
app.delete('/user/:id', user.deleteUser);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
