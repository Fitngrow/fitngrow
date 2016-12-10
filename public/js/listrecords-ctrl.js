angular.module("FitngrowApp")
    .controller("ListRecordsCtrl", function ($scope, $http) {

        function refresh() {
            $http.get("/api/v1/records").then(function (response) {
                $scope.records = response.data;
            });
        }

        refresh();

    });