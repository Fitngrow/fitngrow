/* Creación del historial de un usuario, incluyendo metros recorridos, sesiones de entrenamiento completadas,
media de metros recorridos por sesión de entrenamiento y calorías quemadas*/
module.exports = function (app, apiroot, db) {

    //Creación de tres objetos por defecto en la base de datos
    db.records.find({}, (err, records) => {
        if (records.length == 0) {
            db.records.insert([
                { _id: "1", idUser: "1", distance: 0.0, sessions: 0, averageDistance: 0.0, calories: 0.0, totalTime: 0.0 },
                { _id: "2", idUser: "2", distance: 0.0, sessions: 0, averageDistance: 0.0, calories: 0.0, totalTime: 0.0 },
                { _id: "3", idUser: "3", distance: 0.0, sessions: 0, averageDistance: 0.0, calories: 0.0, totalTime: 0.0 }
            ])
            console.log("A base records is created");
        } else {
            console.log("Loaded " + records.length + " records from the DB.");
        }
    });

    /****Métodos****/

    // Recibir todos los historiales almacenados en el sistema
    app.get(apiroot + "/records", (req, res) => {
        db.records.find({}, (err, records) => {
            if (err) {
                res.sendStatus(500);
            } else {
                res.send(records);
            }
        })
    });

    // Recibir un historial concreto
    app.get(apiroot + "/records/:_id", (req, res) => {
        var _id = req.params._id;

        db.records.find({ _id: _id }, (err, records) => {
            if (err) {
                res.sendStatus(500);
            } else {
                if (records.length > 0)
                    res.send(records[0]);
                else
                    res.sendStatus(404);
            }
        })
    });

    // Recibir el historial de un usuario
    app.get(apiroot + "/records/user/:idUser", (req, res) => {
        var idUser = req.params.idUser;

        db.records.find({ idUser: idUser }, (err, records) => {
            if (err) {
                res.sendStatus(500);
            } else {
                if (records.length > 0)
                    res.send(records[0]);
                else
                    res.sendStatus(404);
            }
        })
    });

    // Añadir un nuevo historial
    app.post(apiroot + "/records", (req, res) => {
        var record = req.body;

        var _id = record._id;
        db.records.find({ _id: _id }, (err, records) => {
            if (records.length == 0) {
                db.records.insert(record);
                res.sendStatus(201);
            } else {
                res.sendStatus(409);
            }
        })
    });

    // Actualizar un historial
    app.put(apiroot + '/records/:_id', function (req, res) {
        var _id = req.params._id;
        var record = req.body;

        if (_id != record._id) {
            res.sendStatus(409);
            return;
        }

        db.records.update({ _id: _id }, record, (err, numUpdate) => {
            if (err) {
                    res.sendStatus(500);
                    console.log("Error");
            } else {
				if (numUpdate == 0) {
					console.log("Record not found");
					res.sendStatus(404);
				} else {
					console.log("Record updated");
					res.sendStatus(200);
				}
			}
        })
    });

    // Eliminar todos los historiales
    app.delete(apiroot + "/records", (req, res) => {
        var _id = req.params._id;

        db.records.remove({}, { multi: true }, (err, numRemoved) => {
            if (err) {
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        })
    });

    // Eliminar un historial
    app.delete(apiroot + "/records/:_id", (req, res) => {
        var _id = req.params._id;

        db.records.remove({ _id: _id }, {}, (err, numRemoved) => {
             if (err) {
                res.sendStatus(500);
                console.log("Error");
            } else {
				if (numRemoved == 0) {
					console.log("Record not found");
					res.sendStatus(404);
				}else{
					res.sendStatus(200);
					console.log("Record deleted");
				}
            }
        })
    });
};