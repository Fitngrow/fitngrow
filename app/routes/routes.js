
module.exports = function(app, apiroot){

    //Algunas rutas
    var route1 = {_id: 1, name: "Caminito del rey", type: "Ruta de naturaleza", subtype: "Senderismo", location: "Málaga", length: 7.7, time:5};
    var route2 = {_id: 2, name: "Sevilla centro", type: "Ruta de ciudad", subtype: "Running", location: "Sevilla", length: 5, time:3};
	var route3 = {_id: 3, name: "Reina Mercedes", type: "Ruta de ciudad", subtype: "Running", location: "Sevilla", length: 2, time:1};
    var routes = [route1, route2, route3];

    // GET. Devolver todas las rutas almacenadas
    app.get(apiroot+'/routes', function(req, res){
        //Se devuelven todas las rutas
        res.json(routes);
    });

    // GET(id). Devolver una ruta según su id
    app.get(apiroot+'/routes/:_id', function(req, res){
        //Se recoge el id pasado
        var _id = req.params._id;

        //Se busca la ruta con ese id
        var route = findRouteBy_id(_id);

        //Si la ruta con ese id existe se devuelve la ruta y si la ruta con ese id no existe se envía un código 404 (no encontrado)
        (route ? res.json(route) : res.sendStatus(404));
    });

    // POST. Añadir una nueva ruta
    app.post(apiroot+'/routes', function(req, res){
        //Se recogen los datos de la nueva ruta
        var route = req.body;

        //Se añade la ruta y se envía un código 201 (creado)
        routes.push(route);
        res.sendStatus(201);
    });
	
	//PUT. Actualizar una ruta según su id
    app.put(apiroot+'/routes/:_id', function(req, res){
		// Se recoge el id pasado
        var _id = req.params._id;
		
		// Se recogen los nuevos valores a actualizar de la ruta
        var route = req.body;

        // Se busca el índice de la ruta según el id pasado
        var index = findRouteIndexBy_id(_id);

        /* Si la ruta existe (valor de index mayor que -1) se actualiza la ruta de dicho índice y se envía el código 200 (OK).   
           Si no existe se envía el código 404 (no encontrado) */
        if (index > -1){
            routes[index] = route;
            res.sendStatus(200);
        }else{
            res.sendStatus(404);
        }
    });

    //DELETE(id). Eliminar la ruta que corresponde al id pasado
    app.delete(apiroot+'/routes/:_id', function(req, res){
        // Se recoge el id pasado
        var _id = req.params._id;

        // Se busca el índice de la ruta según el id pasado
        var index = findRouteIndexBy_id(_id);

        /* Si la ruta existe (valor de index mayor que -1) se borra la ruta de dicho índice y se envía el código 200 (OK).   
           Si no existe se envía el código 404 (no encontrado) */
        if (index > -1){
            //splice(posicionAEliminar,NumItemsAEliminar)
            routes.splice(index,1);
            res.sendStatus(200);
        }else{
            res.sendStatus(404);
        }
    });

    // DELETE. Eliminar todas las rutas
    app.delete(apiroot+'/routes', function(req, res){
        routes = [];
        res.sendStatus(200);
    });

    // Buscar una ruta pasando el id de dicha ruta por parámetro
    function findRouteBy_id(_id){
        //  Se busca y almacena aquella ruta que tenga el id pasado por parámetro
        var route = routes.find( r => r._id == _id);

       return route;
    }

    // Buscar el índice que ocupa la ruta con el id pasado por parámetros
    function findRouteIndexBy_id(_id){
        //Se busca la ruta
        var route = findRouteBy_id(_id);

        //Se busca el índice donde está dicha ruta
        var index = routes.indexOf(route);

        return index;
    }

};