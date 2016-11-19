module.exports = function(app, apiroot){
    //Modulos que se van a usar
    var path = require('path');
    var dataStore = require('nedb');

    //Ruta del directorio donde se guarda el fichero de la base de datos
    var dbFileName = path.join(__dirname,'trainings.json');

    //Creación del fichero de la base de datos
    var db = new dataStore({
        filename : dbFileName,
        autoload : true
    });

    //Creación de un objeto por defecto en la base de datos
    db.find({}, function(err, trainings){
        if (trainings.length == 0) {
            db.insert ({ start : new Date().toISOString(),
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

        db.find({_id : _id}, function(err, trainings){
            if (trainings.length == 0) {
                db.insert(training);
                res.sendStatus(201);
                console.log("Añadido un nuevo entrenamiento");
            } else {
                res.sendStatus(409);
                console.log("Fallo al insertar un nuevo entrenamiento");
            }
        });
    });

    //Método que recibe todos los entrenamientos
    app.get(apiroot+'/trainings', function(req, res){

        db.find({}, function(err,trainings){
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

        db.find({_id : _id}, function(err,trainings){
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

        db.remove({}, {multi : true}, function(err, numRemoved){
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
        db.remove({_id : _id}, {}, function(err, numRemoved){
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
            db.update({}, {multi : true}, function(err, numRemoved){
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