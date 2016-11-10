
module.exports = function(app, apiroot){

    var prizes = [
        {
            _id: 1,
            name: '100 monedas',
            description: 'Has ganado un total de 100 monedas!',
            code: '54E68S234J',
            type: 'coins'
        },
        {
            _id: 2,
            name: '50 monedas',
            description: 'Has ganado un total de 50 monedas!',
            code: '43JJ98ZH3D',
            type: 'coins'
        },
        {
            _id: 3,
            name: 'Fit&Grow shirt',
            description: 'Has ganado una camiseta de fit&grow!',
            code: 'FLMIJ91KS1',
            type: 'shirt'
        }
    ];

    //Recibir todos los premios almacenados en el sistema
    app.get(apiroot+'/prizes', function(req, res){
        res.json(prizes);
    });

    //Eliminar todos los premios almacenados en el sistema
    app.delete(apiroot+'/prizes', function(req, res){
        prizes = [];
        res.sendStatus(200);
    });

    //Añadir un nuevo premio al sistema
    app.post(apiroot+'/prizes', function(req, res){
        var prize = req.body;
        prizes.push(prize);
        res.sendStatus(201);
    });

    //Recibir un premio concreto
    app.get(apiroot+'/prizes/:code', function(req, res){
        //Recogemos el codigo que vamos a capturar desde la URI con la nomenclatura :<nombre>
        var code = req.params.code;

        //Realizamos la busqueda de un premio que tenga por código el recibido
        var prize = prizes.find( p => p.code == code);

        //En el caso que exista, lo devuelvo. En el caso contrario envío un código 404
        (prize) ? res.json(prize) : res.sendStatus(404);
    });

    //Eliminar un premio concreto
    app.delete(apiroot+'/prizes/:code', function(req, res){
        //Recogemos el codigo que vamos a capturar desde la URI con la nomenclatura :<nombre>
        var code = req.params.code;

        //Realizamos la busqueda de un premio que tenga por código el recibido
        var prize = prizes.find( p => p.code == code);

        //Busco el índice donde está el elemento
        var index = prizes.indexOf(prize);

        //Si el elemento existe, index será mayor que -1, por lo que con slice eliminamos ese elemento. En caso contrario enviamos 404
        if (index > -1){
            prizes.splice(index,1);
            res.sendStatus(200);
        }else{
            res.sendStatus(404);
        }
    })




};