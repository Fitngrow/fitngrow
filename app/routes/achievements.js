/**
 * API de logros.
 * @param app Objeto estándar del servidor
 * @param apiroot Ruta raiz de la API
 * @param db Base de datos del servidor
 * @author David López Chica AKA Fasgort
 */
module.exports = function (app, apiroot, db) {

    //Cargamos la DB, repoblando si está vacía
    db.achievements.find({}, (err, achievements) => {
        if (achievements.length == 0) {
            db.achievements.insert([
                {
                    _id: "1",
                    name: 'Mi primera hora',
                    description: 'Tu tiempo de entrenamiento total es de 1 hora. ¡Sigue entrenando!',
                    url: '/test1',
                    type: 'seconds',
                    type_value: 3600
                },
                {
                    _id: "2",
                    name: 'Cogiendo el tranquillo',
                    description: 'Tu tiempo de entrenamiento total es de 4 horas.',
                    url: '/test2',
                    type: 'seconds',
                    type_value: 14400
                },
                {
                    _id: "3",
                    name: 'Iniciado',
                    description: 'Tu tiempo de entrenamiento total es de 24 horas. Comienzas a notar el entrenamiento.',
                    url: '/test3',
                    type: 'seconds',
                    type_value: 86400
                }
            ]);
            console.log("DB is empty. Added default achievements.");
        } else {
            console.log("Loaded " + achievements.length + " achievements from the DB.");
        }
    });

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

    //Recibir todos los logros almacenados en el sistema
    app.get(apiroot + '/achievements', function (req, res) {
        console.log("GET /achievements requested.");

        //Recibimos todos los logros
        db.achievements.find({}, (err, achievements) => {
            if (err) {
                res.sendStatus(500);
            } else {
                res.send(achievements);
            }
        });
    });

    //Eliminar todos los logros almacenados en el sistema
    app.delete(apiroot + '/achievements/', function (req, res) {
        console.log("DELETE /achievements requested.");

        //Eliminamos todos los logros
        db.achievements.remove({}, { multi: true }, (err, numRemoved) => {
            if (err) {
                res.sendStatus(500);
            } else {
                console.log("Deleted " + numRemoved + " achievements.");
                res.sendStatus(200);
            }
        });
    });

    //Recibir un logro concreto
    app.get(apiroot + '/achievements/:id', function (req, res) {
        console.log("GET /achievement/" + req.params.id + " requested.");

        //Recogemos el id que vamos a capturar desde la URI
        var id = req.params.id;

        //Buscamos el logro por el id
        db.achievements.findOne({ _id: id }, function (err, achievement) {
            if (achievement == null) {
                console.log("Achievement not found.");
                res.sendStatus(404);
            } else {
                console.log("Achievement found and returned succesfully.");
                res.send(achievement);
            }
        });

    });

    //Actualizamos un logro
    app.put(apiroot + '/achievements/:id', function (req, res) {

        //Recogemos el logro que hemos recibido
        var achievement = req.body;

        //Recogemos el id que vamos a capturar desde la URI
        var id = req.params.id;

        //Comprobamos que la id del request y la id del body son iguales
        if (id != achievement._id) {
            console.log("Error: Request ID and body ID are different.");
            res.sendStatus(409);
            return;
        }

        //Actualizamos el logro, si existe
        db.achievements.update({ _id: id }, achievement, function (err, numReplaced) {
            if (numReplaced == 0) {
                console.log("Achievement not found.");
                res.sendStatus(404);
            } else {
                console.log("Achievement updated succesfully.");
                res.sendStatus(200);
            }
        });

    });

    //Eliminar un logro concreto
    app.delete(apiroot + '/achievements/:id', function (req, res) {
        console.log("DELETE /achievements/" + req.params.id + " requested.");

        //Recogemos el id que vamos a capturar desde la URI
        var id = req.params.id;

        //Borramos el logro, si existe
        db.achievements.remove({ _id: id }, {}, function (err, numRemoved) {
            if (numRemoved == 0) {
                console.log("Achievement not found.");
                res.sendStatus(404);
            } else {
                console.log("Achievement deleted succesfully.");
                res.sendStatus(200);
            }
        });

    })

};
