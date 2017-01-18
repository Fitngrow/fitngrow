module.exports = function (app, apiroot, db) {
    //Modulos que se van a usar
    var dataStore = require('nedb');
    var momentDate = require('moment');

    //Creación de un objeto por defecto en la base de datos
    db.sports.find({}, function (err, sports) {
        if (sports.length == 0) {
            db.sports.insert([
                { _id: "1", name:"Running", url:"images/running.png", defaultSpeed: 8.0 },
                { _id: "2", name:"Cycling", url:"images/cycling.png", defaultSpeed: 15.0 },
                { _id: "3", name:"Walking", url:"images/walking.png", defaultSpeed: 4.0 }
            ])
            console.log("A base sport is created");
        } else {
            console.log("Loaded " + sports.length + " sports from the DB.");
        }
    });

    /****Métodos****/

    //Método que recibe todos los deportes
    app.get(apiroot + '/sports', function (req, res) {

        db.sports.find({}, function (err, sports) {
            if (err) {
                res.sendStatus(500);
            } else {
                res.send(sports);
            }
        });
    });

    //Método que recibe un deporte
    app.get(apiroot + '/sports/:_id', function (req, res) {
        // Se recoge el id pasado
        var _id = req.params._id;

        db.sports.find({ _id: _id }, function (err, sports) {
            if (err) {
                res.sendStatus(500);
                console.log("Error");
            } else {
                if (sports.length > 0) {
                    res.send(sports[0]);
                } else {
                    res.sendStatus(404);
                    console.log("Sport not found");
                }
            }
        });
    });

    //Método que añade un deporte
    app.post(apiroot + '/sports', function (req, res) {
        var sport = req.body;

        var _id = sport._id;

        db.sports.find({ _id: _id }, function (err, sports) {
            if (sports.length == 0) {
                db.sports.insert(sport);
                res.sendStatus(201);
                console.log("sport added");             
            } else {
                res.sendStatus(409);
                console.log("Error: A sport with the same id already exists");
            }
        });
    });

    //Método que actualiza un deporte
    app.put(apiroot + '/sports/:_id', function (req, res) {
        var _id = req.params._id;
        var sport = req.body;

        if (_id != sport._id) {
            res.sendStatus(409);
            return;
        }

        db.sports.update({ _id: _id }, sport, (err, numUpdate) => {
            if (err) {
                res.sendStatus(500);
                console.log("Error");
            } else {
                if (numUpdate == 0) {
                    console.log("Sport not found");
                    res.sendStatus(404);
                } else {
                    console.log("Sport updated");
                    res.sendStatus(200);
                }
            }
        })
    });
    //Método que elimina todos los deportes
    app.delete(apiroot + '/sports', function (req, res) {
        var _id = req.params._id;

        db.sports.remove({}, { multi: true }, function (err, numRemoved) {
            if (err) {
                res.sendStatus(500);
                console.log("Error");
            } else {
                res.sendStatus(200);
                console.log("Sports deleted");
            }
        });
    });

    //Método que elimina un deporte
    app.delete(apiroot + '/sports/:_id', function (req, res) {
        // Se recoge el id pasado
        var _id = req.params._id;

        /* Si el deporte existe se borra y se envía el código 200 (OK).   
           Si no existe se envía el código 404 (no encontrado) */
        db.sports.remove({ _id: _id }, {}, function (err, numRemoved) {
            if (err) {
                res.sendStatus(500);
                console.log("Error");
            } else {
                if (numRemoved == 0) {
                    console.log("Sport not found");
                    res.sendStatus(404);
                } else {
                    res.sendStatus(200);
                    console.log("Sport deleted");
                }
            }
        });
    });
};