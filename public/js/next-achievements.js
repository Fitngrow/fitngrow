angular.module("FitngrowApp")
    .controller("NextAchievements", function ($scope, $http) {

        // Info usuario provisional
        $scope.meters = 9800;
        $scope.seconds = 14395;

        function refresh() {
            $http.get("/api/v1/achievements").success(function (achievements) {

                var distance_achievement;
                var time_achievement;

                achievements.forEach(function (achievement) {
                    switch (achievement.type) {

                        case "meters":
                            if ($scope.meters < achievement.type_value) {
                                if (distance_achievement == null) distance_achievement = achievement;
                                else if (achievement.type_value < distance_achievement.type_value) distance_achievement = achievement;
                            }
                            break;

                        case "seconds":
                            if ($scope.seconds < achievement.type_value) {
                                if (time_achievement == null) time_achievement = achievement;
                                else if (achievement.type_value < time_achievement.type_value) time_achievement = achievement;
                            }
                            break;

                    }
                })

                //$scope.meters = meters;
                $scope.distance_achievement = distance_achievement;
                $scope.distance_unachieved = true;

                //$scope.seconds = seconds;
                $scope.time_achievement = time_achievement;
                $scope.time_unachieved = true;

            });
        }

        $scope.updateAchievements = function () {
            $scope.runningDistanceMeters = 250; // Información provisional, pendiente de actualizar create-training.js
            $scope.runningTimeSeconds = Math.floor(($scope.newTraining.end - $scope.newTraining.start) / 1000);

            $scope.meters += $scope.runningDistanceMeters;
            $scope.seconds += $scope.runningTimeSeconds;

            if ($scope.meters >= $scope.distance_achievement.type_value) {
                $scope.distance_achievement.url = $scope.distance_achievement.url_achieved;
                $scope.distance_unachieved = false;
            }
            if ($scope.seconds >= $scope.time_achievement.type_value) {
                $scope.time_achievement.url = $scope.time_achievement.url_achieved;
                $scope.time_unachieved = false;
            }


        }

        $scope.resetAchievements = function () {
            refresh();
        }

        refresh();

    });