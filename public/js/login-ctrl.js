angular.module("FitngrowApp")
    .controller("LoginCtrl", function($scope, $http, $location, AuthService){
        
        $scope.login = {};
        $scope.error = null;

        $scope.submit = function(){
            var login = $scope.login;
            AuthService.login(login.username, login.password)
                .then(function(){
                    var user = AuthService.currentUser();
                    if(user){
                        $location.path("/")
                    }else{
                       $scope.error = "Credentials wrong";
                    }
                })

        }

    });