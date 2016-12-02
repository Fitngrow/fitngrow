angular.module("FitngrowApp")
    .controller("Home", function($scope, $http, AuthService){

        console.log("Hello Home Controller");
        refreshUserStatus();

        function refreshUserStatus(){
            AuthService.getUserStatus()
                .then(function(){
                    $scope.currentUser = AuthService.me();
                });
        }
    });