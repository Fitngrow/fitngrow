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

    // CRUD SERVICES -----------------------------------------------------------------------------------------------

    //Añadir un nuevo usuario al sistema
    app.post(apiroot + '/users', function (req, res) {
        console.log("POST /users requested.");

        var user = req.body;

        var _id = user._id;
        db.users.find({ _id: _id }, (err, users) => {
            if (users.length == 0) {
                db.users.insert(user);
                res.sendStatus(200);
            } else {
                res.sendStatus(409);
            }
        })

    });
    //Recibir todos los usuarios almacenados en el sistema
    app.get(apiroot + '/users', function (req, res) {
        console.log("GET /users requested.");

        //Recibimos todos los logros
        db.users.find({}, (err, users) => {
            if (err) {
                res.sendStatus(500);
            } else {
                res.send(removePasswordFromList(users));
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
                res.send(removePassword(user));
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

    //Eliminar un usuario concreto
    app.delete(apiroot + '/users/:id', function (req, res) {
        console.log("DELETE /users/" + req.params.id + " requested.");

        //Recogemos el id que vamos a capturar desde la URI
        var id = req.params.id;

        //Borramos el usuario, si existe
        db.users.remove({ _id: id }, {}, function (err, numRemoved) {
            if (numRemoved == 0) {
                console.log("User not found.");
                res.sendStatus(404);
            } else {
                console.log("User deleted succesfully.");
                res.sendStatus(200);
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

    //Realiza un login a traves de un usuario y una contraseña
    app.post(apiroot + '/users/service/login', passport.authenticate('local'), function(req, res){
        //If this function gets called, authentication was successful
        res.send(removePassword(req.user));
    });

    //Comprueba si el usuario que realiza la petición está logueado o no
    app.get(apiroot + '/users/service/status', function(req, res) {
        if (!req.isAuthenticated()) {
            return res.status(200).json({
                status: false
            });
        }
        res.status(200).json({
            status: true
        });
    });

    //Desloguea al usuario que realiza la petición
    app.get(apiroot + '/users/service/logout', function(req, res) {
        req.logout();
        res.status(200).json({
            status: 'Bye!'
        });
    });

    //Devuelve la información del usuario logueado
    app.get(apiroot + '/users/service/me', function(req, res){
        if (!req.isAuthenticated()) {
            return res.status(404);
        }
        res.send(removePassword(req.user));
    });


    function removePasswordFromList(listUsers){
        return _.map(listUsers, (user)=>_.omit(user, 'password'));
    }

    function removePassword(user){
        return _.omit(user, 'password');
    }
};

