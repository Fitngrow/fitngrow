/**
 * API de usuarios.
 * @param app Objeto estándar del servidor
 * @param apiroot Ruta raiz de la API
 * @param db Base de datos del servidor
 * @author AlbertFX91
 */

var passport = require('passport');
var _ = require('underscore');

module.exports = function (app, apiroot, db) {

    //Cargamos la DB, repoblando si está vacía
    db.users.find({}, (err, users) => {
        if (users.length == 0) {
            db.users.insert([
                {
                    _id: "1", fullName: 'Juan García-Quismondo', username: 'juan', password: 'juan', email: 'juagarfer4@alum.us.es',
                    birthdate: new Date("1991-06-02"), height: 1.86, weight: 80.0
                },
                {
                    _id: "2", fullName: 'David López', username: 'david', password: 'david', email: 'davlopchi@alum.us.es',
                    birthdate: new Date("1996-03-12"), height: 1.60, weight: 60.0
                },
                {
                    _id: "3", fullName: 'Alberto Rojas', username: 'alberto', password: 'alberto', email: 'albrojfer1@alum.us.es',
                    birthdate: new Date("1989-12-28"), height: 1.73, weight: 73.0
                },
                 {
                    _id: "4", fullName: 'Rubén Tavero', username: 'ruben', password: 'ruben', email: 'rubtavpic@alum.us.es',
                    birthdate: new Date("1985-07-17"), height: 1.68, weight: 70.0
                },
                 {
                    _id: "5", fullName: 'Miriam Romero', username: 'miriam', password: 'miriam', email: 'mirromsan@alum.us.es',
                    birthdate: new Date("1991-04-04"), height: 1.68, weight: 55.0
                }
            ]);
            console.log("A base users is created");
        } else {
            console.log("Loaded " + users.length + " users from the DB.");
        }
    });

    /****Métodos****/

    //Recibir todos los usuarios almacenados en el sistema
    app.get(apiroot + '/users', function (req, res) {
        console.log("GET /users requested.");

        //Recibimos todos los usuarios
        db.users.find({}, (err, users) => {
            if (err) {
                res.sendStatus(500);
            } else {
                res.send(removePasswordFromList(users));
            }
        });
    });

    //Recibir un usuario concreto
    app.get(apiroot + '/users/:id', function (req, res) {
        console.log("GET /users/" + req.params.id + " requested.");

        //Recogemos el id que vamos a capturar desde la URI
        var id = req.params.id;

        //Buscamos el usuario por el id
        db.users.findOne({ _id: id }, function (err, user) {
            if (user == null) {
                console.log("User not found.");
                res.sendStatus(404);
            } else {
                console.log("User found and returned succesfully.");
                res.send(removePassword(user));
            }
        });

    });

    //Añadir un nuevo usuario al sistema
    app.post(apiroot + '/users', function (req, res) {
        console.log("POST /users requested.");

        var user = req.body;

        var _id = user._id;
        db.users.find({ _id: _id }, (err, users) => {
            if (users.length == 0) {
                db.users.insert(user, (err, user) => {
                    var _id = user._id;
                    db.records.insert({ idUser: _id, distance: 0, sessions: 0, averageDistance: 0, calories: 0, totalTime: 0 });
                    res.sendStatus(201);
                });
            } else {
                res.sendStatus(409);
            }
        })

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

        //si no se ha rellenado el campo contraseña se obtiene la contraseña del usuario
        if (user.password == null) {
            //Buscamos el usuario por el id
            db.users.findOne({ _id: id }, function (err, user1) {
                if (user == null) {
                    console.log("User not found.");
                    res.sendStatus(404);
                } else {
                    //añadimos en el nuevo usuario el password del antiguo
                    user.password = user1.password
                }
            });

        }

        //Actualizamos el usuario, si existe
        db.users.update({ _id: id }, user, function (err, numReplaced) {
            if (err) {
                res.sendStatus(500);
                console.log("Error");
            } else {
                if (numReplaced == 0) {
                    console.log("User not found");
                    res.sendStatus(404);
                } else {
                    console.log("User updated");
                    res.sendStatus(200);
                }
            }
        });

    });

    //Eliminar todos los usuarios almacenados en el sistema
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

    //Eliminar un usuario concreto
    app.delete(apiroot + '/users/:id', function (req, res) {
        console.log("DELETE /users/" + req.params.id + " requested.");

        //Recogemos el id que vamos a capturar desde la URI
        var id = req.params.id;

        //Borramos el usuario, si existe
        db.users.remove({ _id: id }, {}, function (err, numRemoved) {
            if (err) {
                res.sendStatus(500);
                console.log("Error");
            } else {
                if (numRemoved == 0) {
                    console.log("User not found");
                    res.sendStatus(404);
                } else {
                    res.sendStatus(200);
                    console.log("User deleted");
                }
            }
        });

    });

    // SPECIFIC SERVICES --------------------------------------------------------------------------------------------

    /*
        Todos estos tienen en la url la palabra service, esto es porque hay conflicto con las
        siguientes operaciones:
        - get(users/:id)
        - get(user/logout)
        - get(user/status)
        - get(user/me)
        Se cree que son ids, por lo que ponemos una palabra en medio para que no haya problema
     */

    //Comprueba que no existe otro usuario con el mismo username
    app.get(apiroot + '/users/service/existsUsername/:username', function (req, res) {
        //Recogemos el username que vamos a capturar desde la URI
        var username = req.params.username;
        console.log("GET /users/service/existsUsername/" + req.params.username + " requested.");
        //Buscamos el user por el username
        db.users.findOne({ username: username }, function (err, user) {
            if (user == null) {
                console.log("Username doesn't exist");
                res.status(200).json({
                    status: false
                });
            } else {
                console.log("Username already exists");
                res.status(200).json({
                    status: true
                });
            }
        });

    });

    //Comprueba si el usuario que realiza la petición está logueado o no, así como la información del usuario
    app.get(apiroot + '/users/service/status', function (req, res) {
        if (!req.isAuthenticated()) {
            return res.status(200).json({
                status: false
            });
        }
        res.status(200).json({
            status: true,
            user: removePassword(req.user)
        });
    });

    //Desloguea al usuario que realiza la petición
    app.get(apiroot + '/users/service/logout', function (req, res) {
        req.logout();
        res.status(200).json({
            status: 'Bye!'
        });
    });

    //Realiza un login a traves de un usuario y una contraseña
    app.post(apiroot + '/users/service/login', passport.authenticate('local'), function (req, res) {
        //If this function gets called, authentication was successful
        res.send(removePassword(req.user));
    });

    function removePasswordFromList(listUsers) {
        return _.map(listUsers, (user) => _.omit(user, 'password'));
    }

    function removePassword(user) {
        return _.omit(user, 'password');
    }
};

