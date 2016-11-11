// modules ===========================================

var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

// configuration =====================================

// config files

// set our port

var port = process.env.PORT || 8080;

app.use(bodyParser.json());

// Aquí indicamos la dirección de los ficheros estáticos, de forma que el servidor sabrá devolver los ficheros css, imagenes, etc...
app.use(express.static(__dirname + '/public'));

// routes =============================================

//En este apartado, invocamos a distintos modulos, en los que nosotros vamos a ir añadiendo las rutas
var apiroot = '/api/v1';

//Ejemplo de ficheros con rutas
require('./app/routes/cars')(app, apiroot);
require('./app/routes/drivers')(app, apiroot);


require('./app/routes/prizes')(app, apiroot);
require('./app/routes/records')(app, apiroot);

//Fichero que alberga las rutas gestionadas por angularjs
require('./app/routes/frontend')(app);

// start app

app.listen(port);

// app running message

console.log('Awesome server started on port ' + port);