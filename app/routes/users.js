/**
 * API de usuarios.
 * @param app Objeto estándar del servidor
 * @param apiroot Ruta raiz de la API
 * @param db Base de datos del servidor
 * @author AlbertFX91
 */

var passport = require('passport');

module.exports = function (app, apiroot, db) {


    app.post(apiroot + '/users/login', passport.authenticate('local'), function(req, res){
        //If this function gets called, authentication was successful
        res.send("des");
    });

    app.get(apiroot + '/users/status', function(req, res) {
        if (!req.isAuthenticated()) {
            return res.status(200).json({
                status: false
            });
        }
        res.status(200).json({
            status: true
        });
    });

    app.get(apiroot + '/logout', function(req, res) {
        req.logout();
        res.status(200).json({
            status: 'Bye!'
        });
    });
};
