angular.module("FitngrowApp")
    .controller("RegisterCtrl", function ($scope, $http, $location, AuthService) {
        $scope.newUser = {};
        $scope.error = null;

        $scope.submit = function () {
            var newUser = $scope.newUser;
            AuthService.register(newUser)
                .then(function () {
                    var username = AuthService.existsUserName();
                    if (username) {
                        $scope.error = "Username already exists, please introduce other username";
                    } else {
                        $location.path("login")
                    }
                })
        }

    });

