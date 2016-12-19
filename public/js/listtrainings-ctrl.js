angular.module("FitngrowApp")
    .controller("ListTrainingsCtrl", function ($scope, $http) {
        function refresh() {
            var user = $scope.currentUser;
            var userId = user._id;
            $http.get("/api/v1/trainings/user/" + userId).then(function (response) {
                $scope.trainings = response.data;
            });
        }

        refresh();

    });