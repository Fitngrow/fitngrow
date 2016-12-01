angular.module("FitngrowApp")
    .controller("Home", function($scope, $http){
        
        function refreshUserStatus(){
            AuthService.getUserStatus()
                .then(function(){
                    $scope.currentUser = AuthService.me();
                });
        }
    });