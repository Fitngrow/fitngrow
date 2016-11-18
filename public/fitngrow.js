angular.module("FitngrowApp",["ngRoute"])
    .config(function ($routeProvider){
        $routeProvider
            .when("/",{
                controller: "Home",
                templateUrl: "templates/home.html"
            });
            /*
            .when("/contacts/:name",{
                controller: "EditCtrl",
                templateUrl: "edit.html"
            })
            */
    });