module.exports = function(app, apiroot){

    app.get(apiroot+'/cars', function(req, res){
        res.send("Hello cars!");
    });

};