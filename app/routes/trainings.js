module.exports = function(app, apiroot, db){
    //Modulos que se van a usar
    var dataStore = require('nedb');

    //Creación de un objeto por defecto en la base de datos
    db.trainings.find({}, function(err, trainings){
        if (trainings.length == 0) {
            db.trainings.insert ({ start : new Date().toISOString(),
                         end : new Date().toISOString(),
                         averageHeartRate : 0.0,
                         calories : 0.0,
                         rout : "",
                         distance : 0.0});
            console.log("A base training is created");
        }
    });

    //Método que añade un entrenamiento
    app.post(apiroot+'/trainings', function(req, res){
        var training = req.body;

        var _id = training._id;

        db.trainings.find({_id : _id}, function(err, trainings){
            if (trainings.length == 0) {
                db.trainings.insert(training);
                res.sendStatus(201);
                console.log("Añadido un nuevo entrenamiento");
                db.records.find({}, function(err, records){
                    if (err) {
                        //res.sendStatus(500);
                        console.log("Fallo al recibir los datos del historial");
                    } else {
                        if (records.length > 0) {
                            //Falta averiguar como coger solamente las horas del fin del entrenamiento
                            var session = records[0].sessions + 1;
                            var calories = records[0].calories + training.calories;
                            var meters = records[0].meters + training.distance;
                            var averageMeters = meters / session;

                            records[0].sessions = session;
                            records[0].calories = calories;
                            records[0].meters = meters;
                            records[0].averageMeters = averageMeters;

                            var record = records[0];
                            db.records.update({},record, function(err, numRemoved){
                                if (err) {
                                    console.log("No existe el historial a actualizar");
                                } else {
                                    console.log(record.totalTime);
                                    console.log("Historial cambiado correctamente");
                                }
                            });
                        } else {
                            console.log("No hay historial para mostrar");
                        }
                    }
                    
                });
            } else {
                res.sendStatus(409);
                console.log("Fallo al insertar un nuevo entrenamiento");
            }
        });
    });

    //Método que recibe todos los entrenamientos
    app.get(apiroot+'/trainings', function(req, res){

        db.trainings.find({}, function(err,trainings){
            if (err) {
                res.sendStatus(500);
            } else {
                res.send(trainings);
            }
        });
    });

    //Método que recibe un entrenamiento
    app.get(apiroot+'/trainings/:_id', function(req, res){
        // Se recoge el id pasado
        var _id = req.params._id;

        db.trainings.find({_id : _id}, function(err,trainings){
            if (err) {
                res.sendStatus(500);
                console.log("Fallo al recibir los datos de entrenamientos");
            } else {
                if (trainings.length > 0) {
                    res.send(trainings[0]);
                } else {
                    res.sendStatus(404);
                    console.log("No hay entrenamientos para mostrar");
                }
            }
        });
    });

    //Método que elimina todos los entrenamientos
    app.delete(apiroot+'/trainings', function(req, res){
        var _id = req.params._id;

        db.trainings.remove({}, {multi : true}, function(err, numRemoved){
            if (err) {
                res.sendStatus(500);
                console.log("Fallo al eliminar los entrenamientos");
            } else {
                res.sendStatus(200);
                console.log("Eliminados todos los entrenamientos");
            }
        }); 
    });

    //Método que elimina un entrenamiento
    app.delete(apiroot+'/trainings/:_id', function(req, res){
        // Se recoge el id pasado
        var _id = req.params._id;

        /* Si el entrenamiento existe se borra y se envía el código 200 (OK).   
           Si no existe se envía el código 404 (no encontrado) */
        db.trainings.remove({_id : _id}, {}, function(err, numRemoved){
            if (err) {
                res.sendStatus(500);
                console.log("Fallo al eliminar el entrenamiento");
            } else {
                res.sendStatus(200);
                console.log("Eliminados el entrenamiento");
            }
        }); 
    });

    //Método que actualiza un entrenamiento
    app.put(apiroot+'/trainings/:_id', function(req, res){
        var training = req.body;
        
        //Cogemos el id
        var _id = req.params._id;

        if (_id != training._id) {
            res.sendStatus(409);
            console.log("El identificador no es correcto");
            return;
        } else {
            db.trainings.update({}, {multi : true}, function(err, numRemoved){
                if (err) {
                    res.sendStatus(500);
                    console.log("No existe el entrenamiento a actualizar");
                } else {
                    res.sendStatus(200);
                    console.log("Entrenamiento modificado satisfactoriamente");
                }
            });
        }
    });

}