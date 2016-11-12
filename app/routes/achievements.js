/**
 * Creación de rutas para los logros. Basado en el código de prizes.js (autor: Albert_FX91)
 * @param app objeto servidor
 * @param apiroot ruta raiz para la api
 * @author Fasgort
 */
module.exports = function (app, apiroot) {

    var achievements = [
        {
            _id: 1,
            name: 'Mi primera hora',
            description: 'Tu tiempo de entrenamiento total es de 1 hora. ¡Sigue entrenando!',
            type: 'time',
            type_value: 3600
        },
        {
            _id: 2,
            name: 'Cogiendo el tranquillo',
            description: 'Tu tiempo de entrenamiento total es de 4 horas.',
            type: 'time',
            type_value: 14400
        },
        {
            _id: 3,
            name: 'Iniciado',
            description: 'Tu tiempo de entrenamiento total es de 24 horas. Comienzas a notar el entrenamiento.',
            type: 'time',
            type_value: 86400
        }
    ];

    //Añadir un nuevo logro al sistema
    app.post(apiroot + '/achievements', function (req, res) {
        var achievement = req.body;
        achievements.push(achievement);
        res.sendStatus(201);
    });

    //Recibir todos los logros almacenados en el sistema
    app.get(apiroot + '/achievements', function (req, res) {
        res.json(achievements);
    });

    //Eliminar todos los logros almacenados en el sistema
    app.delete(apiroot + '/achievements', function (req, res) {
        achievements = [];
        res.sendStatus(200);
    });

    //Recibir un logro concreto
    app.get(apiroot + '/achievements/:id', function (req, res) {
        //Recogemos el id que vamos a capturar desde la URI
        var id = req.params.id;

        //Buscamos el logro por el id
        var achievement = findAchievementById(id);

        //En el caso que exista, lo devuelvo. En el caso contrario envío un código 404
        (achievement) ? res.json(achievement) : res.sendStatus(404);
    });

    //Actualizamos un logro
    app.put(apiroot + '/achievements/:id', function (req, res) {
        var achievement = req.body;

        //Recogemos el id que vamos a capturar desde la URI
        var id = req.params.id;

        //Busco el índice del logro por el id para luego eliminarlo.
        var index = findAchievementIndexById(id);

        //Si el elemento existe, index será mayor que -1, por lo que con actualizamos el elemento. En caso contrario enviamos 404
        if (index > -1) {
            achievements[index] = achievement;
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    });

    //Eliminar un logro concreto
    app.delete(apiroot + '/achievements/:id', function (req, res) {
        //Recogemos el id que vamos a capturar desde la URI
        var id = req.params.id;

        //Busco el índice del logro por el código para luego eliminarlo.
        var index = findAchievementIndexById(id);

        //Si el elemento existe, index será mayor que -1, por lo que con slice eliminamos ese elemento. En caso contrario enviamos 404
        if (index > -1) {
            achievements.splice(index, 1);
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    });

    /**
     * Busca un logro con el id pasado por parametro
     * @param id
     * @returns {*}
     */
    function findAchievementById(id) {
        //Realizamos la busqueda de un logro que tenga por id el recibido
        var achievement = achievements.find(a => a._id == id);

        return achievement;
    }

    /**
     * Busca el indice que ocupa el logro con el id pasado por parametro
     * @param id
     * @returns {*}
     */
    function findAchievementIndexById(id) {
        //Realizamos la busqueda del logro
        var achievement = findAchievementById(id);

        //Busco el índice donde está el elemento
        var index = achievements.indexOf(achievement);

        return index;
    }

};