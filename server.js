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

require('./app/routes')(app);

// start app

app.listen(port);

// app running message

console.log("Awesome server started on port ' + port'");