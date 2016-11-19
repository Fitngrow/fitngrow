angular.module("FitngrowApp")
    .controller("ListTrainingsCtrl", function ($scope,$http){
        console.log("ListTrainings controller initialized");

        function refresh(){
            $http.get("/api/v1/trainings").success(function (trainings){
                $scope.trainings = trainings;
            });
        }

        refresh();

    });