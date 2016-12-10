angular.module("FitngrowApp")
    .controller("ListAchievementsCtrl", function ($scope, $http) {

        // Info usuario provisional
        var meters = 12350;
        var seconds = 9700;

        function refresh() {
            $http.get("/api/v1/achievements").then(function (response) {

                // Cálculo de logros
                var achieved_achievements = [];
                var unachieved_achievements = [];


                response.data.forEach(function (achievement) {
                    switch (achievement.type) {

                        case "meters":
                            if (meters >= achievement.type_value) {
                                achievement.url = achievement.url_achieved;
                                achieved_achievements.push(achievement);
                            }
                            else unachieved_achievements.push(achievement);
                            break;

                        case "seconds":
                            if (seconds >= achievement.type_value) {
                                achievement.url = achievement.url_achieved;
                                achieved_achievements.push(achievement);
                            }
                            else unachieved_achievements.push(achievement);
                            break;

                    }
                })
                // Cálculo de logros END

                $scope.achieved_achievements = achieved_achievements;
                $scope.unachieved_achievements = unachieved_achievements;

            });
        }

        refresh();

    });