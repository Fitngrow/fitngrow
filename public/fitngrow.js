angular.module("FitngrowApp", ["ngRoute"])
    .config(function ($routeProvider) {
        $routeProvider
            .when("/", {
                controller: "Home",
                templateUrl: "templates/home.html",
                access: {restricted: false}
            })
            .when("/achievements", {
                controller: "ListAchievementsCtrl",
                templateUrl: "templates/listachievements.html",
                access: {restricted: true}
            })
            .when("/records", {
                controller: "ListRecordsCtrl",
                templateUrl: "templates/listrecords.html",
                access: {restricted: true}
            })
            .when("/trainingsRecord", {
                controller: "ListTrainingsCtrl",
                templateUrl: "templates/listtrainings.html",
                access: {restricted: true}
            })
    })
    /*
        A continuación definimos que cada vez que, se cambie de una ruta a otra,
        se compruebe si es una ruta restringida, accediendo al atributo access.restricted.
        En el caso de que sea restringido y no estemos logueados, entonces enviamos a la vista de login.
   
     */
    .run(function($rootScope, $location, $route){
       $rootScope.$on('$routeChangeStart', function(event, next, current){
           var status = true;
           if(next.access.restricted && status){
               $location.path('/login');
               $route.reload();
           }
       })
    });