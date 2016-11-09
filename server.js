// modules ===========================================

var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

// configuration =====================================

// config files

// set our port

var port = process.env.PORT || 8080;

app.use(bodyParser.json());

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

// routes =============================================

//En este apartado, invocamos a distintos modulos, en los que nosotros vamos a ir añadiendo las rutas
var apiroot = '/api/v1';
require('./app/routes/cars')(app, apiroot);
require('./app/routes/drivers')(app, apiroot);


require('./app/routes/frontend')(app);

// start app

app.listen(port);

// app running message

console.log('Awesome server started on port ' + port);