angular.module("FitngrowApp")
    .controller("CreateTraining", function($scope, $http){
        console.log("Welcome to Create training!");


        $scope.hideStart = false;
        $scope.hideEnd = true;

        $scope.startTraining = function(){
            $scope.start = new Date();
            $scope.hideStart = true;
            $scope.hideEnd = false;
        };
        $scope.endTraining = function(){
            $scope.end = new Date();
            $scope.hideEnd = true;
        };
    });