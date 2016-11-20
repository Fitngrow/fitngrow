angular.module("FitngrowApp",["ngRoute"])
    .config(function ($routeProvider){
        $routeProvider
            .when("/",{
                controller: "Home",
                templateUrl: "templates/home.html"
            })
            .when("/achievements",{
                controller: "ListAchievementsCtrl",
                templateUrl: "templates/listachievements.html"
            })
            .when("/records",{
                controller: "ListRecordsCtrl",
                templateUrl: "templates/listrecords.html"
            })
    });