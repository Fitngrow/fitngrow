angular.module("FitngrowApp")
    .controller("MainCtrl", function ($scope,$http,$location, AuthService){
        AuthService.getUserStatus();
        $scope.$watch( AuthService.isLoggedIn, function ( isLoggedIn ) {
            $scope.isLoggedIn = isLoggedIn;
            $scope.currentUser = AuthService.currentUser();
        });

        $scope.logout = function() {
            AuthService.logout()
                .then(function(){
                    $location.path("/");
        })
        };

        //Funcion de login.
        $scope.login = function() {
            $location.path("/login")
        };

        //Funcion de formulario
        $scope.register = function() {
            $location.path("/register")
        };

    });
