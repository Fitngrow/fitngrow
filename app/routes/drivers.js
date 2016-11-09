//Esta primera linea indica la entrada del módulo cuando sea invocado
module.exports = function(app, apiroot){

    app.get(apiroot+'/drivers', function(req, res){
        res.send("Hello drivers!!!");
    });

};