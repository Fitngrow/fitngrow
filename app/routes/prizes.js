/**
 * Creación de rutas para los premios.
 * @param app objeto servidor
 * @param apiroot ruta raiz para la api
 * @author Albert_FX91
 */
module.exports = function (app, apiroot, db) {

    db.prizes.find({}, (err, prizes) => {
        if (prizes.length == 0) {
            db.prizes.insert([
                { _id: "1", idUser: "1", name: '100 coins', description: 'You have won a total of 100 coins!', code: '54E68S234J', type: 'coins' },
                { _id: "2", idUser: "1", name: '50 coins', description: 'You have won a total of 50 coins!', code: '43JJ98ZH3D', type: 'coins' },
                { _id: "3", idUser: "1", name: 'Fit&Grow shirt', description: 'You have won a shirt of fit&grow!', code: 'FLMIJ91KS1', type: 'shirt' }
            ])
            console.log("A base prizes is created");
        } else {
            console.log("Loaded " + prizes.length + " prizes from the DB.");
        }
    });

    /****Métodos****/

    // Recibir todos los premios almacenados en el sistema
    app.get(apiroot + "/prizes", (req, res) => {
        db.prizes.find({}, (err, prizes) => {
            if (err) {
                res.sendStatus(500);
            } else {
                res.send(prizes);
            }
        })
    });

    // Recibir un premio concreto
    app.get(apiroot + "/prizes/:_id", (req, res) => {
        var _id = req.params._id;

        db.prizes.find({ _id: _id }, (err, prizes) => {
            if (err) {
                res.sendStatus(500);
            } else {
                if (prizes.length > 0)
                    res.send(prizes[0]);
                else
                    res.sendStatus(404);
            }
        })
    });

    // Recibir los premios de un usuario
    app.get(apiroot + "/prizes/user/:idUser", (req, res) => {
        var idUser = req.params.idUser;

        db.prizes.find({ idUser: idUser }, (err, prizes) => {
            if (err) {
                res.sendStatus(500);
            } else {
                if (prizes.length > 0)
                    res.send(prizes);
                else
                    res.sendStatus(404);
            }
        })
    });

    // Añadir un nuevo premio al sistema
    app.post(apiroot + "/prizes", (req, res) => {
        var prize = req.body;

        var _id = prize._id;
        db.prizes.find({ _id: _id }, (err, prizes) => {
            if (prizes.length == 0) {
                db.prizes.insert(prize);
                res.sendStatus(201);
            } else {
                res.sendStatus(409);
            }
        })
    });

    // Actualizar un premio
    app.put(apiroot + '/prizes/:_id', function (req, res) {
        var _id = req.params._id;
        var prize = req.body;

        if (_id != prize._id) {
            res.sendStatus(409);
            return;
        }

        db.prizes.update({ _id: _id }, prize, (err, numUpdate) => {
            if (err) {
                res.sendStatus(500);
                console.log("Error");
            } else {
                if (numUpdate == 0) {
                    console.log("Prize not found");
                    res.sendStatus(404);
                } else {
                    console.log("Prize updated");
                    res.sendStatus(200);
                }
            }
        })
    });

    //Eliminar todos los premios almacenados en el sistema
    app.delete(apiroot + "/prizes", (req, res) => {
        var _id = req.params._id;

        db.prizes.remove({}, { multi: true }, (err, numRemoved) => {
            if (err) {
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        })
    });

    //Eliminar un premio concreto
    app.delete(apiroot + "/prizes/:_id", (req, res) => {
        var _id = req.params._id;

        db.prizes.remove({ _id: _id }, {}, (err, numRemoved) => {
            if (err) {
                res.sendStatus(500);
                console.log("Error");
            } else {
                if (numRemoved == 0) {
                    console.log("Prize not found");
                    res.sendStatus(404);
                } else {
                    res.sendStatus(200);
                    console.log("Prize deleted");
                }
            }
        })
    });
};