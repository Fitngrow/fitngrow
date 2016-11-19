// modules ===========================================

var express = require('express');
var bodyParser = require('body-parser');
var dataStore = require("nedb");
var path = require("path");
var app = express();

// configuration =====================================

// config files

// set our port
var port = process.env.PORT || 8080;

// DB creation
var dbFileName = path.join(__dirname, 'db/');
var db = {};

db.achievements = new dataStore({
    filename: dbFileName + "achievements.json",
    autoload: true
});

db.prizes = new dataStore({
    filename: dbFileName + "prizes.json",
    autoload: true
});

db.records = new dataStore({
    filename: dbFileName + "records.json",
    autoload: true
});

db.routes = new dataStore({
    filename: dbFileName + "routes.json",
    autoload: true
});

db.trainings = new dataStore({
    filename: dbFileName + "trainings.json",
    autoload: true
});

db.users = new dataStore({
    filename: dbFileName + "users.json",
    autoload: true
});

console.log("DB initialized.");
// End DB

app.use(bodyParser.json());

// Aquí indicamos la dirección de los ficheros estáticos, de forma que el servidor sabrá devolver los ficheros css, imagenes, etc...
app.use(express.static(__dirname + '/public'));

// routes =============================================

//En este apartado, invocamos a distintos modulos, en los que nosotros vamos a ir añadiendo las rutas
var apiroot = '/api/v1';

require('./app/routes/achievements')(app, apiroot, db);
require('./app/routes/prizes')(app, apiroot, db);
require('./app/routes/records')(app, apiroot, db);
require('./app/routes/routes')(app, apiroot, db);
require('./app/routes/trainings')(app, apiroot, db);

// start app
app.listen(port);

// app running message
console.log('Server is ready. Running on port ' + port);