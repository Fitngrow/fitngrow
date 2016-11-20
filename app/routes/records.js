/* Creación del historial de un usuario, incluyendo metros recorridos, sesiones de entrenamiento completadas,
media de metros recorridos por sesión de entrenamiento y calorías quemadas*/

module.exports = function(app, apiroot, db){

    db.records.find({}, (err, records) => {
        if(records.length == 0){
            db.records.insert({ meters: 0, sessions: 0, averageMeters: 0, calories : 0, totalTime : 0})
            console.log("DB is empty. Added default record.");
        }
    });

    // Recibir todos los historiales almacenados en el sistema
    app.get(apiroot+"/records",(req,res)=>{
        db.records.find({},(err,records)=>{
            if (err){
                res.sendStatus(500);
            }else{
                res.send(records);
            }
        })
    });

    // Recibir un historial concreto
    app.get(apiroot+"/records/:_id",(req,res)=>{
        var _id = req.params._id;

        db.records.find({_id : _id},(err,records)=>{
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
    app.post(apiroot+"/records",(req,res)=>{
        var record = req.body;

        var _id = record._id;
        db.records.find({_id : _id},(err,records)=>{
        if (records.length == 0){
            db.records.insert(record);
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

        if(_id != record._id){
            res.sendStatus(409);
            return;
        }

        db.records.update({_id : _id},record,(err,numUpdate)=>{
            if (err){
                res.sendStatus(500);
                    }else{
                        res.sendStatus(200);
                    }
        })
    });

    // Eliminar un historial
    app.delete(apiroot+"/records/:_id",(req,res)=>{
        var _id = req.params._id;

        db.records.remove({_id : _id},{},(err,numRemoved)=>{
            if (err){
                res.sendStatus(500);
            }else{
                res.sendStatus(200);
            }
        })
    });

    // Eliminar todos los historiales
    app.delete(apiroot+"/records",(req,res)=>{
        var _id = req.params._id;

        db.records.remove({},{multi : true},(err,numRemoved)=>{
            if (err){
                res.sendStatus(500);
            }else{
                res.sendStatus(200);
            }
        })
    });

};