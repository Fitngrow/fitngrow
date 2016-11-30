angular.module("FitngrowApp")
    .controller("NextAchievements", function ($scope, $http) {

        // Info usuario provisional
        var meters = 12350;
        var seconds = 9700;

        function refresh() {
            $http.get("/api/v1/achievements").success(function (achievements) {

                var distance_achievement;
                var time_achievement;

                achievements.forEach(function (achievement) {
                    switch (achievement.type) {

                        case "meters":
                            if (meters < achievement.type_value) {
                                if (distance_achievement == null) distance_achievement = achievement;
                                else if (achievement.type_value < distance_achievement.type_value) distance_achievement = achievement;
                            }
                            break;

                        case "seconds":
                            if (seconds < achievement.type_value) {
                                if (time_achievement == null) time_achievement = achievement;
                                else if (achievement.type_value < time_achievement.type_value) time_achievement = achievement;
                            }
                            break;

                    }
                })

                $scope.meters = meters;
                $scope.distance_achievement = distance_achievement;

                $scope.seconds = seconds;
                $scope.time_achievement = time_achievement;

            });
        }

        refresh();

    });