angular.module("FitngrowApp")
    .controller("ListRecordsCtrl", function ($scope, $http) {
        function refresh() {
            var user = $scope.currentUser;
            var userId = user.params.userId;
            // $http.get("/api/v1/records").then(function (response) {
            $http.get("/api/v1/records/user/" + userId).then(function (response) {
                $scope.records = response.data;
            });
        }

        refresh();

    });