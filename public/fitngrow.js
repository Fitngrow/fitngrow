angular.module("FitngrowApp",["ngRoute"])
    .config(function ($routeProvider){
        $routeProvider
            .when("/",{
                controller: "Home",
                templateUrl: "templates/home.html"
            })
            .when("/records",{
                controller: "ListRecordsCtrl",
                templateUrl: "templates/listrecords.html"
            })
			.when("/trainingsRecord",{
                controller: "ListTrainingsCtrl",
                templateUrl: "templates/listtrainings.html"
            })
    });