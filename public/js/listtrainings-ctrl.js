angular.module("FitngrowApp")
    .controller("ListTrainingsCtrl", function ($scope, $http) {

        function refresh() {
            $http.get("/api/v1/trainings").then(function (response) {
                $scope.trainings = response.trainings;
            }).catch(function (response) {
                console.log("error4");
            });
        }

        refresh();

    });