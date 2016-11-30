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
    db.users.find({}, (err, users) => {
        if (users.length == 0) {
            db.users.insert([
                {
                    _id: "1",
                    fullName: 'Full username 1',
                    username: 'user1',
                    password: 'user1',
                    email: 'user1@gmail.com',
                    birthdate: new Date("1991-06-02"),
                    height: 1.86,
                    weight: 80.0
                },
                {
                    _id: "2",
                    fullName: 'Full username 2',
                    username: 'user2',
                    password: 'user2',
                    email: 'user2@gmail.com',
                    birthdate: new Date("1996-03-12"),
                    height: 1.60,
                    weight: 60.0
                },
                {
                    _id: "3",
                    fullName: 'Linus Benedict Torvalds',
                    username: 'Linux4Life',
                    password: 'Linux4Life',
                    email: 'Linus@gmail.com',
                    birthdate: new Date("1969-12-28"),
                    height: 1.73,
                    weight: 73.0
                }
            ]);
            console.log("DB is empty. Added default users.");
        } else {
            console.log("Loaded " + users.length + " users from the DB.");
        }
    });

    app.post(apiroot + '/users/login', passport.authenticate('local'), function(req, res){
        //If this function gets called, authentication was successful
        res.send("des");
    });

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

    app.get(apiroot + '/logout', function(req, res) {
        req.logout();
        res.status(200).json({
            status: 'Bye!'
        });
    });
};
