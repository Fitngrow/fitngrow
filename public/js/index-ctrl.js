angular.module("FitngrowApp")
    .controller("IndexCtrl", function ($scope,$http,$location, AuthService){

        refreshUserStatus();

        $scope.logout = function() {
            AuthService.logout()
                .then(function(){
                    refreshUserStatus();
                    $location.path("/")
                })
        };

        //Funcion de ejemplo de login con usuario de prueba. Esto en realidad no se usaría, y al pulsar en login te enviaría a un formulario de login
        $scope.login = function() {
            AuthService.login("user1","user1")
                .then(function(){
                    refreshUserStatus();
                    $location.path("/")
                })
        };

        function refreshUserStatus(){
            AuthService.getUserStatus()
                .then(function(){
                    $scope.currentUser = AuthService.me();
                });
        }
    });
