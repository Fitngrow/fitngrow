/**
 * API de logros.
 * @param app Objeto estándar del servidor
 * @param apiroot Ruta raiz de la API
 * @param db Base de datos del servidor
 * @author David López Chica AKA Fasgort
 */
module.exports = function (app, apiroot, db) {

    //Creación de seis objetos por defecto en la base de datos
    db.achievements.find({}, (err, achievements) => {
        if (achievements.length == 0) {
            db.achievements.insert([
                {
                    _id: "1", name: 'First timer', description: 'You are starting. Train and grow with us!', url: '/images/firsttimer.png',
                    url_achieved: '/images/firsttimer_a.jpg', type: 'seconds', type_value: 3600
                },
                {
                    _id: "2", name: 'Getting good', description: 'You are getting better at it, continue training!', url: '/images/gettinggood.png',
                    url_achieved: '/images/gettinggood_a.jpg', type: 'seconds', type_value: 14400
                },
                {
                    _id: "3", name: 'Star', description: 'Nothing is stopping you, continue your training!', url: '/images/star.png',
                    url_achieved: '/images/star_a.jpg', type: 'seconds', type_value: 86400
                },
                {
                    _id: "4", name: 'Road to fitness', description: 'You ran your first kilometer, you have a long road ahead of you.',
                    url: '/images/road.png', url_achieved: '/images/road_a.jpg', type: 'meters', type_value: 1000
                },
                {
                    _id: "5", name: 'Grow explosion', description: 'You are ever-running the long road, continue doing so!',
                    url: '/images/volcano.png', url_achieved: '/images/volcano_a.jpg', type: 'meters', type_value: 10000
                },
                {
                    _id: "6", name: 'Heart for the world', description: 'You ran 100 kilometers, your heart is a world on its own.',
                    url: '/images/heartworld.png', url_achieved: '/images/heartworld_a.jpg', type: 'meters', type_value: 100000
                }
            ]);
            console.log("A base achievements is created");
        } else {
            console.log("Loaded " + achievements.length + " achievements from the DB.");
        }
    });

    /****Métodos****/

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
            if (err) {
                res.sendStatus(500);
            } else {
                if (numReplaced == 0) {
                    console.log("Achievement not found");
                    res.sendStatus(404);
                } else {
                    console.log("Achievement updated");
                    res.sendStatus(200);
                }
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

    //Eliminar un logro concreto
    app.delete(apiroot + '/achievements/:id', function (req, res) {
        console.log("DELETE /achievements/" + req.params.id + " requested.");

        //Recogemos el id que vamos a capturar desde la URI
        var id = req.params.id;

        //Borramos el logro, si existe
        db.achievements.remove({ _id: id }, {}, function (err, numRemoved) {
            if (err) {
                res.sendStatus(500);
                console.log("Error");
            } else {
                if (numRemoved == 0) {
                    console.log("Achievement not found");
                    res.sendStatus(404);
                } else {
                    res.sendStatus(200);
                    console.log("Achievement deleted");
                }
            }
        });

    })
};
