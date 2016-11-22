/**
 * Creación de rutas para los premios.
 * @param app objeto servidor
 * @param apiroot ruta raiz para la api
 * @author Albert_FX91
 */
module.exports = function(app, apiroot, db){

var dataStore = require('nedb');

db.prizes.find({}, (err, prizes) => {
        if(prizes.length == 0){
            /* db.prizes.insert({ meters: 0, sessions: 0, averageMeters: 0, calories : 0, totalTime : 0}) */
            db.prizes.insert([{name: '100 monedas', description: 'Has ganado un total de 100 monedas!', code: '54E68S234J', type: 'coins' },
                            {name: '50 monedas', description: 'Has ganado un total de 50 monedas!', code: '43JJ98ZH3D', type: 'coins' },
                            {name: 'Fit&Grow shirt', description: 'Has ganado una camiseta de fit&grow!', code: 'FLMIJ91KS1', type: 'shirt' }])
            console.log("DB is empty. Added default prizes.");
        }
    });

    // Recibir todos los premios almacenados en el sistema
    app.get(apiroot+"/prizes",(req,res)=>{
        db.prizes.find({},(err,prizes)=>{
            if (err){
                res.sendStatus(500);
            }else{
                res.send(prizes);
            }
        })
    });

    //Eliminar todos los premios almacenados en el sistema
    app.delete(apiroot+"/prizes",(req,res)=>{
        var _id = req.params._id;

        db.prizes.remove({},{multi : true},(err,numRemoved)=>{
            if (err){
                res.sendStatus(500);
            }else{
                res.sendStatus(200);
            }
        })
    });

    // Añadir un nuevo premio al sistema
    app.post(apiroot+"/prizes",(req,res)=>{
        var prize = req.body;

        var _id = prize._id;
        db.prizes.find({_id : _id},(err,prizes)=>{
        if (prizes.length == 0){
            db.prizes.insert(prize);
            res.sendStatus(200);
        }else{
            res.sendStatus(409);
        }
    })
    });

    // Recibir un premio concreto
    app.get(apiroot+"/prizes/:_id",(req,res)=>{
        var _id = req.params._id;

        db.prizes.find({_id : _id},(err,prizes)=>{
            if (err){
                res.sendStatus(500);
            }else{
                if (prizes.length > 0)
                    res.send(prizes[0]);
                else
                    res.sendStatus(404);
            }   
        })
    });

    //Eliminar un premio concreto
    app.delete(apiroot+"/prizes/:_id",(req,res)=>{
        var _id = req.params._id;

        db.prizes.remove({_id : _id},{},(err,numRemoved)=>{
            if (err){
                res.sendStatus(500);
            }else{
                res.sendStatus(200);
            }
        })
    });

    // Actualizar un premio
    app.put(apiroot+'/prizes/:_id', function(req, res){ 
        var _id = req.params._id;
        var prize = req.body;

        if(_id != prize._id){
            res.sendStatus(409);
            return;
        }

        db.prizes.update({_id : _id},prize,(err,numUpdate)=>{
            if (err){
                res.sendStatus(500);
                    }else{
                        res.sendStatus(200);
                    }
        })
    });

};