// modules ===========================================

var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

// configuration =====================================

// config files

// set our port

var port = process.env.PORT || 8080;

app.use(bodyParser.json());

// routes =============================================


var apiroot = '/api/v1';
require('./app/routes/cars')(app, apiroot);
require('./app/routes/drivers')(app, apiroot);

// start app

app.listen(port);

// app running message

console.log('Awesome server started on port ' + port);