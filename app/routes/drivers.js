module.exports = function(app, apiroot){

    app.get(apiroot+'/drivers', function(req, res){
        res.send("Hello drivers!!!");
    });

};