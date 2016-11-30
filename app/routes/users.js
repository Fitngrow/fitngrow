/**
 * API de usuarios.
 * @param app Objeto estándar del servidor
 * @param apiroot Ruta raiz de la API
 * @param db Base de datos del servidor
 * @author AlbertFX91
 */

var passport = require('passport');

module.exports = function (app, apiroot, db) {


    //Cargamos la DB, repoblando si está vacía
    /*db.achievements.find({}, (err, achievements) => {
        if (achievements.length == 0) {
            db.achievements.insert([
                {
                    _id: "1",
                    name: 'Mi primera hora',
                    description: 'Tu tiempo de entrenamiento total es de 1 hora. ¡Sigue entrenando!',
                    url: '/images/firsttimer.png',
                    type: 'seconds',
                    type_value: 3600
                },
                {
                    _id: "2",
                    name: 'Cogiendo el tranquillo',
                    description: 'Tu tiempo de entrenamiento total es de 4 horas.',
                    url: '/images/gettinggood.png',
                    type: 'seconds',
                    type_value: 14400
                },
                {
                    _id: "3",
                    name: 'Iniciado',
                    description: 'Tu tiempo de entrenamiento total es de 24 horas. Comienzas a notar el entrenamiento.',
                    url: '/images/star.png',
                    type: 'seconds',
                    type_value: 86400
                }
            ]);
            console.log("DB is empty. Added default achievements.");
        } else {
            console.log("Loaded " + achievements.length + " achievements from the DB.");
        }
    });
    */

    //Añadir un nuevo logro al sistema
    app.post(apiroot + '/achievements', function (req, res) {
        console.log("POST /achievements requested.");

        //Recogemos el logro que hemos recibido
        var achievement = req.body;

        //Recogemos el id del logro recibido
        var id = achievement._id;

        //Buscamos si el logro no existe, y lo añadimos
        db.achievements.findOne({ _id: id }, function (err, existing_achievement) {
            if (existing_achievement == null) {
                db.achievements.insert(achievement);
                console.log("Achievement added: " + req.body.name);
                res.sendStatus(201);
            } else {
                console.log("Error: An achievement with the same id already exists.");
                res.sendStatus(409);
            }
        });

    });

    app.post(apiroot + '/users/login', passport.authenticate('local'), function(req, res){
        //If this function gets called, authentication was successful
        res.send("des");
    })

    app.get(apiroot + '/users/status', function(req, res) {
        if (!req.isAuthenticated()) {
            return res.status(200).json({
                status: false
            });
        }
        res.status(200).json({
            status: true
        });
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.status(200).json({
            status: 'Bye!'
        });
    });
};
