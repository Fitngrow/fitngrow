angular.module("FitngrowApp", ["ngRoute"])
    .config(function($routeProvider) {
        $routeProvider
            .when("/", {
                controller: "Home",
                templateUrl: "templates/home.html",
                access: { restricted: false }
            })
            .when("/login", {
                controller: "LoginCtrl",
                templateUrl: "templates/login.html",
                access: { restricted: false }
            })
            .when("/register", {
                controller: "RegisterCtrl",
                templateUrl: "templates/register.html",
                access: { restricted: false }
            })
            .when("/achievements", {
                controller: "ListAchievementsCtrl",
                templateUrl: "templates/listachievements.html",
                access: { restricted: true }
            })
            .when("/records", {
                controller: "ListRecordsCtrl",
                templateUrl: "templates/listrecords.html",
                access: { restricted: true }
            })
            .when("/trainingsRecord", {
                controller: "ListTrainingsCtrl",
                templateUrl: "templates/listtrainings.html",
                access: { restricted: true }
            })
            .when("/profile", {
                controller: "ProfileCtrl",
                templateUrl: "templates/profile.html",
                access: { restricted: true }
            .when("/postman", {
                controller: "Postman",
                templateUrl: "templates/postman.html",
                access: { restricted: false }

            })
    }).config(['$locationProvider', function($locationProvider) {
        $locationProvider.hashPrefix('');
    }])
    /*
        A continuación definimos que cada vez que, se cambie de una ruta a otra,
        se compruebe si es una ruta restringida, accediendo al atributo access.restricted.
        En el caso de que sea restringido y no estemos logueados, entonces enviamos a la vista de login.
   
     */
    .run(function($rootScope, $location, $route, AuthService) {
        $rootScope.$on('$routeChangeStart',
            function(event, next, current) {
                AuthService.getUserStatus(function(){
                    if (next.access && next.access.restricted && !AuthService.isLoggedIn()) {
                        $location.path('/login');
                        $route.reload();
                    }

                    //Definimos que cuando queramos ir a login, pero estemos logeados, entonces nos mande a la raiz
                    if (AuthService.isLoggedIn() && next.originalPath === "/login") {
                        $location.path('/');
                    }
                });

            });
    });