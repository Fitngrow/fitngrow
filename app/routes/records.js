/* Creacion del historial de un usuario, incluyendo identificador, kilometros recorridos, sesiones de entrenamiento completadas,
media de kilometros recorridos por sesion de entrenamiento y calorias quemadas*/

module.exports = function(app, apiroot){
var path = require('path');
var dbFileName = path.join(__dirname,'records.json');
var dataStore = require("nedb");

console.log("DB initialized");

var db = new dataStore({
       filename: dbFileName,
       autoload: true
   });

db.find({}, (err,records)=>{
    if(records.length == 0){
        /*
        db.insert([{ meters: 849000, sessions: 46, averageMeters: 18000.46, calories : 84},
                    {meters: 500000, sessions: 31, averageMeters: 16000.13, calories : 70},
                  ]);
        */
        db.insert({ meters: 0, sessions: 0, averageMeters: 0, calories : 0});
        console.log("Inserted 1 default record");
    }else{
        console.log("Loaded DB with "+records.length+" records");
    }
});

    // Recibir todos los historiales almacenados en el sistema
    /*
    app.get(apiroot+'/records', function(req, res){
        res.json(records);
    });
    */
    app.get(apiroot+"/records",(req,res)=>{
    console.log("New GET request over /records");
    db.find({},(err,records)=>{
        if (err){
            res.sendStatus(500);
        }else{
            res.send(records);
        }
    })
    });

    // Recibir un historial concreto
    /*
    app.get(apiroot+'/records/:_id', function(req, res){
        // Se recoge la _id a capturar desde la URI con la nomenclatura :<nombre>
        var _id = req.params._id;

        // Se busca el historial por la _id
        var record = findRecordBy_id(_id);

        // En el caso de que exista, se devuelve. En caso contrario, se envía un código 404
        (record) ? res.json(record) : res.sendStatus(404);
    });
    */

    app.get(apiroot+"/records/:_id",(req,res)=>{

    var _id = req.params._id;
    console.log("New GET request over /record/"+_id);

    db.find({_id : _id},(err,records)=>{
        if (err){
            res.sendStatus(500);
        }else{
            if (records.length > 0)
                res.send(records[0]);
            else
                res.sendStatus(404);
        }
    })
});

    // Añadir un nuevo historial
    /*
    app.post(apiroot+'/records', function(req, res){
        var record = req.body;

        records.push(record);
        res.sendStatus(201);
    });
    */

    app.post(apiroot+"/records",(req,res)=>{
    console.log("New POST request over /records");
    var record = req.body;

    var _id = record._id;
    db.find({_id : _id},(err,records)=>{
        if (records.length == 0){
            db.insert(record);
            res.sendStatus(200);
        }else{
            res.sendStatus(409);
        }
    })

});

    // Actualizar un historial
    app.put(apiroot+'/records/:_id', function(req, res){
        
        var _id = req.params._id;
        var record = req.body;

        console.log("New PUT request over /records/"+_id);
        console.log("Data: "+JSON.stringify(record,2));

        if(_id != record._id){
            res.sendStatus(409);
            return;
        }

        db.update({_id : _id},record,(err,numUpdate)=>{
            if (err){
                res.sendStatus(500);
            }else{
                console.log("Updated "+numUpdate+" objects");
                res.sendStatus(200);
            }
        })
        /*
        // Se recoge la _id a capturar desde la URI con la nomenclatura :<nombre>
        var _id = req.params._id;

        // Se busca el índice del historial por su _id
        var index = findRecordIndexBy_id(_id);

        // Si el historial existe, index será mayor que -1, por lo que se actualiza el historial. En caso contrario, se envía un
        // código 404
        if (index > -1){
            records[index] = record;
            res.sendStatus(200);
        }else{
            res.sendStatus(404);
        }
        */
    });

    // Eliminar un historial
    /*
    app.delete(apiroot+'/records/:_id', function(req, res){
        // Se recoge la _id a capturar desde la URI con la nomenclatura :<nombre>
        var _id = req.params._id;

        // Se busca el indice del historial por su _id
        var index = findRecordIndexBy_id(_id);

        // Si el historial existe, index será mayor que -1, por lo que se con slice se actualiza el historial. En caso contrario, 
        // se envía un código 404
        if (index > -1){
            records.splice(index,1);
            res.sendStatus(200);
        }else{
            res.sendStatus(404);
        }
    });
    */

    app.delete(apiroot+"/records/:_id",(req,res)=>{

    var _id = req.params._id;
    console.log("New DELETE request over /record/"+_id);

    db.remove({_id : _id},{},(err,numRemoved)=>{
        if (err){
            res.sendStatus(500);
        }else{
            console.log("Deleted "+numRemoved+" objects");
            res.sendStatus(200);
        }
    })
});

    // Eliminar todos los historiales
    /*
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
    */

    app.delete(apiroot+"/records",(req,res)=>{

    var _id = req.params._id;
    console.log("New DELETE request over /records");

    db.remove({},{multi : true},(err,numRemoved)=>{
        if (err){
            res.sendStatus(500);
        }else{
            console.log("Deleted "+numRemoved+" objects");
            res.sendStatus(200);
        }
    })
});

    // Buscar el índice que ocupa el historial con el _id pasado por parametro
    function findRecordIndexBy_id(_id){

        //Se busca el historial
        var record = findRecordBy_id(_id);

        //Buscar el índice donde está el historial
        var index = records.indexOf(record);

        return index;
    }

};