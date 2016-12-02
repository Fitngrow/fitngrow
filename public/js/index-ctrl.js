angular.module("FitngrowApp")
    .controller("IndexCtrl", function ($scope,$http,$location, AuthService){

        //refreshUserStatus();

        $scope.$watch( AuthService.isLoggedIn, function ( isLoggedIn ) {
            $scope.isLoggedIn = isLoggedIn;
            $scope.currentUser = AuthService.currentUser();
        });

        $scope.logout = function() {
            AuthService.logout()
                .then(function(){
                    refreshUserStatus();
                    var url = $location.url();
                    // Cuando estamos en la ruta /, y hacemos $location.path("/"), no cambia. Entonces no se refresca la vista y en algunas partes se ve como que estas logueado y en otras no.
                    // Por lo tanto, como corrección temporal, realizamos un refresco de la pagina cuando estemos en la raiz y hagamos logout
                    url == '/' ? window.location.reload() :  $location.path("/");
        })
        };

        //Funcion de ejemplo de login con usuario de prueba. Esto en realidad no se usaría, y al pulsar en login te enviaría a un formulario de login
        $scope.login = function() {
            /*AuthService.login("user1","user1")
                .then(function(){
                    refreshUserStatus();
                    $location.path("/")
                })*/
            $location.path("/login")
        };

        function refreshUserStatus(){
            AuthService.getUserStatus()
                .then(function(){
                    $scope.currentUser = AuthService.currentUser();
                });
        }
    });
