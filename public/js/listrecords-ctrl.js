angular.module("FitngrowApp")
    .controller("ListRecordsCtrl", function ($scope, $http) {
        function refresh() {
            var user = $scope.currentUser;
            var userId = user._id;
            $http.get("/api/v1/records/user/" + userId).then(function (response) {
                $scope.record = response.data[0];
            });
        }

        refresh();

    });