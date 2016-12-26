module.exports = function (app, apiroot, db) {
    //Modulos que se van a usar
    var dataStore = require('nedb');
    var momentDate = require('moment');

    //Creación de un objeto por defecto en la base de datos
    db.trainings.find({}, function (err, trainings) {
        if (trainings.length == 0) {
            db.trainings.insert([
                { _id: "1", idUser: "1", idSport: "1", start: new Date(), end: new Date(), calories: 1.0, distance: 1.0 },
                { _id: "2", idUser: "1", idSport: "2", start: new Date(), end: new Date(), calories: 2.0, distance: 2.0 },
                { _id: "3", idUser: "1", idSport: "3", start: new Date(), end: new Date(), calories: 3.0, distance: 3.0 }
            ])
            console.log("A base training is created");
        } else {
            console.log("Loaded " + trainings.length + " trainings from the DB.");
        }
    });

    /****Métodos****/

    //Método que recibe todos los entrenamientos
    app.get(apiroot + '/trainings', function (req, res) {

        db.trainings.find({}, function (err, trainings) {
            if (err) {
                res.sendStatus(500);
            } else {
                res.send(trainings);
            }
        });
    });

    //Método que recibe un entrenamiento
    app.get(apiroot + '/trainings/:_id', function (req, res) {
        // Se recoge el id pasado
        var _id = req.params._id;

        db.trainings.find({ _id: _id }, function (err, trainings) {
            if (err) {
                res.sendStatus(500);
                console.log("Error");
            } else {
                if (trainings.length > 0) {
                    res.send(trainings[0]);
                } else {
                    res.sendStatus(404);
                    console.log("Training not found");
                }
            }
        });
    });

    //Método que recibe los entrenamientos de un usuario
    app.get(apiroot + '/trainings/user/:idUser', function (req, res) {
        // Se recoge el id pasado
        var idUser = req.params.idUser;

        db.trainings.find({ idUser: idUser }, function (err, trainings) {
            if (err) {
                res.sendStatus(500);
                console.log("Error");
            } else {
                if (trainings.length > 0) {
                    res.send(trainings);
                } else {
                    res.sendStatus(404);
                    console.log("Training not found");
                }
            }
        });
    });

    //Método que añade un entrenamiento
    app.post(apiroot + '/trainings', function (req, res) {
        var training = req.body;

        var _id = training._id;

        db.trainings.find({ _id: _id }, function (err, trainings) {
            if (trainings.length == 0) {
                db.trainings.insert(training);
                console.log("training added");
                console.log(training.idUser);
                db.records.findOne({idUser: training.idUser}, function (err, record) {
                    if (err) {
                        res.sendStatus(500);
                        console.log("Error");
                    } else {
                        if (record) {
                            //Falta averiguar como coger solamente las horas del fin del entrenamiento
                            var session = record.sessions + 1;
                            var calories = record.calories + training.calories;
                            var distance = record.distance + training.distance;
                            var averageDistance = distance * 1.0 / session;
                            var time = (parseInt(momentDate(training.end).hour()) - 12) + record.totalTime;

                            record.sessions = session;
                            record.calories = calories;
                            record.distance = distance;
                            record.averageDistance = averageDistance;
                            record.totalTime = time;

                            db.records.update({_id: record._id}, record, function (err, numRemoved) {
                                if (err) {
                                    res.sendStatus(500);
                                    console.log("Error");
                                } else {
                                    res.sendStatus(200);
                                    console.log("Record updated");
                                }
                            });
                        } else {
                            res.sendStatus(404);
                            console.log("Record not found");
                        }
                    }

                });
            } else {
                res.sendStatus(409);
                console.log("Error: An training with the same id already exists");
            }
        });
    });
    //Método que actualiza un entrenamiento
    app.put(apiroot + '/trainings/:_id', function (req, res) {
        var _id = req.params._id;
        var training = req.body;

        if (_id != training._id) {
            res.sendStatus(409);
            return;
        }

        db.trainings.update({ _id: _id }, training, (err, numUpdate) => {
            if (err) {
                res.sendStatus(500);
                console.log("Error");
            } else {
                if (numUpdate == 0) {
                    console.log("Training not found");
                    res.sendStatus(404);
                } else {
                    console.log("Training updated");
                    res.sendStatus(200);
                }
            }
        })
    });
    //Método que elimina todos los entrenamientos
    app.delete(apiroot + '/trainings', function (req, res) {
        var _id = req.params._id;

        db.trainings.remove({}, { multi: true }, function (err, numRemoved) {
            if (err) {
                res.sendStatus(500);
                console.log("Error");
            } else {
                res.sendStatus(200);
                console.log("Trainings deleted");
            }
        });
    });

    //Método que elimina un entrenamiento
    app.delete(apiroot + '/trainings/:_id', function (req, res) {
        // Se recoge el id pasado
        var _id = req.params._id;

        /* Si el entrenamiento existe se borra y se envía el código 200 (OK).   
           Si no existe se envía el código 404 (no encontrado) */
        db.trainings.remove({ _id: _id }, {}, function (err, numRemoved) {
            if (err) {
                res.sendStatus(500);
                console.log("Error");
            } else {
                if (numRemoved == 0) {
                    console.log("Training not found");
                    res.sendStatus(404);
                } else {
                    res.sendStatus(200);
                    console.log("Training deleted");
                }
            }
        });
    });
};