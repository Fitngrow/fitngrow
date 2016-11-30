// modules ===========================================

var express = require('express');
var bodyParser = require('body-parser');
var dataStore = require("nedb");
var path = require("path");
var app = express();
var moment = require("moment");
var expressSession = require('express-session');
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var cookieParser = require('cookie-parser');

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

// Aquí indicamos la dirección de los ficheros estáticos, de forma que el servidor sabrá devolver los ficheros css, imagenes, etc...
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// routes =============================================

//En este apartado, invocamos a distintos modulos, en los que nosotros vamos a ir añadiendo las rutas
var apiroot = '/api/v1';

require('./app/routes/achievements')(app, apiroot, db);
require('./app/routes/prizes')(app, apiroot, db);
require('./app/routes/records')(app, apiroot, db);
require('./app/routes/routes')(app, apiroot, db);
require('./app/routes/trainings')(app, apiroot, db);
require('./app/routes/users')(app, apiroot, db);


// Authentication =============================================


passport.use(new LocalStrategy(
   function(username, password, done){
       /*
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
        */
       return done(null, {username: "userTest", email: "EmailTest", fullName: "FullName Test"})
   }
));
passport.serializeUser(function(user, done){
    done(null, user.username);
});
passport.deserializeUser(function(username, done){
    done(null, {username: "userTest", email: "EmailTest", fullName: "FullName Test"});
});


// start app
app.listen(port);

// app running message
console.log('Server is ready. Running on port ' + port);