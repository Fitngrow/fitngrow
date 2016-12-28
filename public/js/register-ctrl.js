angular.module("FitngrowApp")
    .controller("RegisterCtrl", function ($scope, $http, $location, AuthService) {
        $scope.newUser = {};
        $scope.error = null;

        $scope.submit = function () {
            $scope.newUser.birthdate = textToDate($scope.newUser.birthdate);
            var newUser = $scope.newUser;
            AuthService.register(newUser)
                .then(function () {
                    var username = AuthService.existsUserName();
                    if (username) {
                        $scope.error = "Username already exists, please introduce other username";
                    } else {
                        $location.path("login");
                    }
                })
        }

        function textToDate(str) {           
            var dt = str.substring(6, 10) + '-' + str.substring(3, 5) + '-' + str.substring(0, 2)           
            var date1 = new Date(dt);
            return date1;
        }

    });

