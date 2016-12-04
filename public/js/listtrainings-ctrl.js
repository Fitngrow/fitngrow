angular.module("FitngrowApp")
    .controller("ListTrainingsCtrl", function ($scope,$http){

        function refresh(){
            $http.get("/api/v1/trainings").success(function (trainings){
                $scope.trainings = trainings;
            });
        }

        refresh();

    });