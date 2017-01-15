angular.module("FitngrowApp")
    .controller("ListAchievementsCtrl", function ($scope, $http) {

        var meters;
        var seconds;

        function refresh() {
            updateUserInfo();
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

        function updateUserInfo() {
            $http.get("/api/v1/records/" + $scope.currentUser._id).then(function (response) {
                meters = response.data.distance;
                seconds = response.data.totalTime;
            });
        }

        refresh();

    });