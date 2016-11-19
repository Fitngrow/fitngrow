angular.module("FitngrowApp")
    .controller("ListAchievementsCtrl", function ($scope, $http) {
        console.log("List controller initialized");

        function refresh() {
            $http.get("/api/v1/achievements").success(function (achievements) {
                $scope.achievements = achievements;
            });
        }

        refresh();

    });