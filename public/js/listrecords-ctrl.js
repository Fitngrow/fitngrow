angular.module("FitngrowApp")
    .controller("ListRecordsCtrl", function ($scope, $http) {

        function refresh() {
            $http.get("/api/v1/records").then(function (response) {
                $scope.records = response.records;
            }).catch(function (response) {
                console.log("error3");
            });
        }

        refresh();

    });