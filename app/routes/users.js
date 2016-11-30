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

    // CRUD SERVICES --------------------------------------------

    //Añadir un nuevo logro al sistema
    /*app.post(apiroot + '/achievements', function (req, res) {
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
    */
    //Recibir todos los logros almacenados en el sistema
    app.get(apiroot + '/users', function (req, res) {
        console.log("GET /users requested.");

        //Recibimos todos los logros
        db.users.find({}, (err, users) => {
            if (err) {
                res.sendStatus(500);
            } else {
                res.send(users);
            }
        });
    });

    //Eliminar todos los logros almacenados en el sistema
    app.delete(apiroot + '/users/', function (req, res) {
        console.log("DELETE /users requested.");

        //Eliminamos todos los users
        db.users.remove({}, { multi: true }, (err, numRemoved) => {
            if (err) {
                res.sendStatus(500);
            } else {
                console.log("Deleted " + numRemoved + " users.");
                res.sendStatus(200);
            }
        });
    });

    //Recibir un usuario concreto
    app.get(apiroot + '/users/:id', function (req, res) {
        console.log("GET /users/" + req.params.id + " requested.");

        //Recogemos el id que vamos a capturar desde la URI
        var id = req.params.id;

        //Buscamos el logro por el id
        db.users.findOne({ _id: id }, function (err, user) {
            if (user == null) {
                console.log("User not found.");
                res.sendStatus(404);
            } else {
                console.log("User found and returned succesfully.");
                res.send(user);
            }
        });

    });

    //Actualizamos un usuario
    app.put(apiroot + '/users/:id', function (req, res) {

        //Recogemos el usuario que hemos recibido
        var user = req.body;

        //Recogemos el id que vamos a capturar desde la URI
        var id = req.params.id;

        //Comprobamos que la id del request y la id del body son iguales
        if (id != user._id) {
            console.log("Error: Request ID and body ID are different.");
            res.sendStatus(409);
            return;
        }

        //Actualizamos el logro, si existe
        db.users.update({ _id: id }, user, function (err, numReplaced) {
            if (numReplaced == 0) {
                console.log("User not found.");
                res.sendStatus(404);
            } else {
                console.log("User updated succesfully.");
                res.sendStatus(200);
            }
        });

    });

    //Eliminar un logro concreto
    app.delete(apiroot + '/users/:id', function (req, res) {
        console.log("DELETE /users/" + req.params.id + " requested.");

        //Recogemos el id que vamos a capturar desde la URI
        var id = req.params.id;

        //Borramos el logro, si existe
        db.users.remove({ _id: id }, {}, function (err, numRemoved) {
            if (numRemoved == 0) {
                console.log("User not found.");
                res.sendStatus(404);
            } else {
                console.log("User deleted succesfully.");
                res.sendStatus(200);
            }
        });

    })



    // SPECIFIC SERVICES --------------------------------------------




    app.post(apiroot + '/users/login', passport.authenticate('local'), function(req, res){
        //If this function gets called, authentication was successful
        res.send(req.user);
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

    app.get(apiroot + '/users/logout', function(req, res) {
        req.logout();
        res.status(200).json({
            status: 'Bye!'
        });
    });
};
