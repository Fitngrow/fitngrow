angular.module("FitngrowApp")
    .controller("ListRecordsCtrl", function ($scope, $http) {
        function refresh() {
            var user = $scope.currentUser;
            var userId = user._id;
            $http.get("/api/v1/records/user/" + userId).then(function (response) {
                console.log(response.data);
                $scope.records = response.data;
            });
        }

        refresh();

    });