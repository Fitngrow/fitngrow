/* Creacion del historial de un usuario, incluyendo identificador, kilometros recorridos, sesiones de entrenamiento completadas,
media de kilometros recorridos por sesion de entrenamiento y calorias quemadas*/

module.exports = function(app, apiroot){

var record1 = {_id: 3, kilometers: 849, sessions: 46, averagekm: 18.46, calories : 84};
var record2 = {_id: 4, kilometers: 500, sessions: 31, averagekm: 16.13, calories : 70};

var records = [record1, record2];

    // Recibir todos los historiales almacenados en el sistema
    app.get(apiroot+'/records', function(req, res){
        res.json(records);
    });

    // Recibir un historial concreto
    app.get(apiroot+'/records/:_id', function(req, res){
        // Se recoge la _id a capturar desde la URI con la nomenclatura :<nombre>
        var _id = req.params._id;

        // Se busca el historial por la _id
        var record = findRecordBy_id(_id);

        // En el caso de que exista, se devuelve. En caso contrario, se envía un código 404
        (record) ? res.json(record) : res.sendStatus(404);
    });

    // Añadir un nuevo historial
    app.post(apiroot+'/records', function(req, res){
        var record = req.body;

        records.push(record);
        res.sendStatus(201);
    });

    // Actualizar un historial
    app.put(apiroot+'/records/:_id', function(req, res){
        var record = req.body;

        // Se recoge la _id a capturar desde la URI con la nomenclatura :<nombre>
        var _id = req.params._id;

        // Se busca el índice del historial por su _id
        var index = findRecordIndexBy_id(_id);

        /* Si el historial existe, index será mayor que -1, por lo que se actualiza el historial. En caso contrario, se envía un
        código 404 */
        if (index > -1){
            records[index] = record;
            res.sendStatus(200);
        }else{
            res.sendStatus(404);
        }
    });

    // Eliminar un historial
    app.delete(apiroot+'/records/:_id', function(req, res){
        // Se recoge la _id a capturar desde la URI con la nomenclatura :<nombre>
        var _id = req.params._id;

        // Se busca el indice del historial por su _id
        var index = findRecordIndexBy_id(_id);

        /* Si el historial existe, index será mayor que -1, por lo que se con slice se actualiza el historial. En caso contrario, 
        se envía un código 404 */
        if (index > -1){
            records.splice(index,1);
            res.sendStatus(200);
        }else{
            res.sendStatus(404);
        }
    });

    // Eliminar todos los historiales
    app.delete(apiroot+'/records', function(req, res){
        records = [];
        res.sendStatus(200);
    });

    // Buscar un historial pasándole su _id por parámetro
    function findRecordBy_id(_id){
        //  Se busca un historial que tenga por código el recibido
        var record = records.find( r => r._id == _id);

       return record;
    }

    // Buscar el índice que ocupa el historial con el _id pasado por parametro
    function findRecordIndexBy_id(_id){

        //Se busca el historial
        record = findRecordBy_id(_id);

        //Buscar el índice donde está el historial
        var index = records.indexOf(record);

        return index;
    }

};