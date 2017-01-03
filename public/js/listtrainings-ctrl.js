angular.module("FitngrowApp")
    .controller("ListTrainingsCtrl", function ($scope, $http) {
        function refresh() {
            var user = $scope.currentUser;
            var userId = user._id;
            $http.get("/api/v1/trainings/user/" + userId).then(function (response) {
                $scope.trainings = response.data;
                for (i = 0; i < $scope.trainings.length; i++) {
                    $scope.trainings[i].start = $scope.trainings[i].start.substring(0, 10) + " " + $scope.trainings[i].start.substring(11, 23)
                    $scope.trainings[i].end = $scope.trainings[i].end.substring(0, 10) + " " + $scope.trainings[i].end.substring(11, 23)
                }
            });
        }

        refresh();

    });