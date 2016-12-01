angular.module("FitngrowApp")
    .controller("ListAchievementsCtrl", function ($scope, $http) {

        function refresh() {
            $http.get("/api/v1/achievements").success(function (achievements) {
                $scope.achievements = achievements;
            });
        }

        refresh();

    });