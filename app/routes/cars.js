//Esta primera linea indica la entrada del módulo cuando sea invocado
module.exports = function(app, apiroot){

    app.get(apiroot+'/cars', function(req, res){
        res.send("Hello cars!");
    });

};