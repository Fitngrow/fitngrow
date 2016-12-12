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
                    Materialize.toast('See you soon!', 3000, 'rounded');
        })
        };

        //Funcion de ejemplo de login con usuario de prueba. Esto en realidad no se usaría, y al pulsar en login te enviaría a un formulario de login
        $scope.login = function() {
            $location.path("/login")
        };

    });
