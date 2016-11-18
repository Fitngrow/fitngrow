angular.module("FitngrowApp")
    .controller("CreateTraining", function($scope, $http){
        console.log("Welcome to Create training!");



        $scope.startTraining = function(){
            $scope.start = new Date();
        };
        $scope.endTraining = function(){
            $scope.end = new Date();
        };
    });