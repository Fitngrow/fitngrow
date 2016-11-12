module.exports = function(app, apiroot){
    
    //Entrenamientos
    var training1 = {
        _id: 1,
        timeEnd: "01:05:23",
        mediumFrequency: 115
    }

    var training2 = {
        _id: 2,
        timeEnd: "00:55:20",
        mediumFrequency: 112
    }

    var training3 = {
        _id: 3,
        timeEnd: "01:30:23",
        mediumFrequency: 113
    }

    var training4 = {
        _id: 4,
        timeEnd: "00:30:53",
        mediumFrequency: 108
    }

    var trainings = [training1,training2,training3,training4];

    //Método que añade un entrenamiento
    app.post(apiroot+'/trainings', function(req, res){
        var training = req.body;

        trainings.push(training);
        res.sendStatus(201);
    });

    //Método que recibe todos los entrenamientos
    app.get(apiroot+'/trainings', function(req, res){
        res.json(trainings);
    });

    //Método que elimina todos los entrenamientos
    app.delete(apiroot+'/trainings', function(req, res){
        trainings = [];
        res.sendStatus(200);
    });

    //Método que borra un entrenamiento
    app.delete(apiroot+'/trainings/:_id', function(req, res){
        // Se recoge el id pasado
        var _id = req.params._id;

        // Se busca el índice de la ruta según el id pasado
        var index = findTrainingIndexById(_id);

        /* Si la ruta existe (valor de index mayor que -1) se borra la ruta de dicho índice y se envía el código 200 (OK).   
           Si no existe se envía el código 404 (no encontrado) */
        if (index > -1){
            //splice(posicionAEliminar,NumItemsAEliminar)
            trainings.splice(index,1);
            res.sendStatus(200);
        }else{
            res.sendStatus(404);
        }
    });

    //Método que actualiza un entrenamiento
    app.put(apiroot+'/trainings/:_id', function(req, res){
        var training = req.body;
        
        //Cogemos el id
        var _id = req.params._id;

        //Busco el índice del entrenamiento por el id para actualizarlo.
        var index = findTrainingIndexById(_id);

        //Actualizamos el entrenamiento
        if (index > -1){
            trainings[index] = training;
            res.sendStatus(200);
        }else{
            res.sendStatus(404);
        }
    });

    //Función para recuperar un entrenamiento pasándole un id como parámetro
    function findTrainingById(_id){
        //Realizamos la busqueda de un entrenamiento que tenga por id el recibido
        var training = trainings.find( p => p._id == _id);

       return training;
    }

    //Función que devuelve el índice del entrenamiento que tiene el id pasado por parámetro
    function findTrainingIndexById(_id){
        //Realizamos la busqueda del entrenamiento
        var training = findTrainingById(_id);

        //Busco el índice donde está el elemento
        var index = trainings.indexOf(training);

        return index;
    }

}