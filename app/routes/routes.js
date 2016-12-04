
module.exports = function(app, apiroot, db) {

    db.routes.find({}, (err, routes) => {
        if (routes.length == 0) {
            db.routes.insert([
                { _id: "1", idUser: "1", name: "Caminito del rey", type: "Trekking", location: "Málaga", length: 7.7, time: 5 },
                { _id: "2", idUser: "1", name: "Sevilla centro", type: "Running", location: "Sevilla", length: 5, time: 3 },
                { _id: "3", idUser: "1", name: "Reina Mercedes", type: "Skating", location: "Sevilla", length: 2, time: 1 }
            ])
            console.log("A base routes is created");
        } else {
            console.log("Loaded " + routes.length + " routes from the DB.");
        }
    });

    // Recibir todas las rutas almacenadas en el sistema
    app.get(apiroot + "/routes", (req, res) => {
        db.routes.find({}, (err, routes) => {
            if (err) {
                res.sendStatus(500);
            } else {
                res.send(routes);
            }
        })
    });

    // Recibir una ruta concreta
    app.get(apiroot + "/routes/:_id", (req, res) => {
        var _id = req.params._id;

        db.routes.find({ _id: _id }, (err, routes) => {
            if (err) {
                res.sendStatus(500);
            } else {
                if (routes.length > 0)
                    res.send(routes[0]);
                else
                    res.sendStatus(404);
            }
        })
    });

    // Añadir una nueva ruta
    app.post(apiroot + "/routes", (req, res) => {
        var route = req.body;

        var _id = route._id;
        db.routes.find({ _id: _id }, (err, routes) => {
            if (routes.length == 0) {
                db.routes.insert(route);
                res.sendStatus(201);
            } else {
                res.sendStatus(409);
            }
        })
    });

    // Actualizar una ruta
    app.put(apiroot + '/routes/:_id', function(req, res) {
        var _id = req.params._id;
        var route = req.body;

        if (_id != route._id) {
            res.sendStatus(409);
            return;
        }

        db.routes.update({ _id: _id }, route, (err, numUpdate) => {
            if (err) {
                    res.sendStatus(500);
                    console.log("Error");
            } else {
				if (numUpdate == 0) {
					console.log("Route not found");
					res.sendStatus(404);
				} else {
					console.log("Route updated");
					res.sendStatus(200);
				}
			}
        })
    });

    // Eliminar todos las rutas
    app.delete(apiroot + "/routes", (req, res) => {
        var _id = req.params._id;

        db.routes.remove({}, { multi: true }, (err, numRemoved) => {
            if (err) {
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        })
    });

    // Eliminar una ruta
    app.delete(apiroot + "/routes/:_id", (req, res) => {
        var _id = req.params._id;

        db.routes.remove({ _id: _id }, {}, (err, numRemoved) => {
             if (err) {
                res.sendStatus(500);
                console.log("Error");
            } else {
				if (numRemoved == 0) {
					console.log("Router not found");
					res.sendStatus(404);
				}else{
					res.sendStatus(200);
					console.log("Routed deleted");
				}
            }
        })
    });
};