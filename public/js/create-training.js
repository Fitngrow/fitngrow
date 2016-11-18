angular.module("FitngrowApp")
    .controller("CreateTraining", function($scope, $http){
        console.log("Welcome to Create training!");


        $scope.newTraining = {};
        $scope.hideStart = false;
        $scope.hideEnd = true;
        $scope.hideTrainingForm = true;

        $scope.startTraining = function(){
            $scope.newTraining.start = new Date();
            $scope.hideStart = true;
            $scope.hideEnd = false;
        };
        $scope.endTraining = function(){
            $scope.newTraining.end = new Date();
            $scope.hideEnd = true;
            $scope.hideTrainingForm = false;
        };
    });