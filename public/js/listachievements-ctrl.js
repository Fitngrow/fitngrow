angular.module("FitngrowApp")
    .controller("ListAchievementsCtrl", function ($scope, $http) {
        console.log("List controller initialized");

        // Info usuario provisional
        var meters = 12350;
        var seconds = 9700;

        function refresh() {
            $http.get("/api/v1/achievements").success(function (achievements) {

                // Cálculo de logros
                achievements.forEach(function (achievement) {
                    switch (achievement.type) {

                        case "meters":
                            if (meters >= achievement.type_value) {
                                achievement.achieved = true;
                                achievement.url = achievement.url_achieved;
                            }
                            else achievement.achieved = false;
                            break;

                        case "seconds":
                            if (seconds >= achievement.type_value) {
                                achievement.achieved = true;
                                achievement.url = achievement.url_achieved;
                            }
                            else achievement.achieved = false;
                            break;

                    }
                })
                // Cálculo de logros END

                $scope.achievements = achievements;

            });
        }

        refresh();

    });