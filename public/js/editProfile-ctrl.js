angular.module("FitngrowApp")
    .controller("EditProfileCtrl", function ($scope, $http, $location) {

        function refresh() {
            var user = $scope.currentUser;
            var userId = user._id;
            $http.get("/api/v1/users/" + userId).then(function (response) {
                $scope.profile = response.data;
                $scope.profile.birthdate = $scope.profile.birthdate.substring(8, 10) + "/" + $scope.profile.birthdate.substring(5, 7) + "/" + $scope.profile.birthdate.substring(0, 4);
            });
        }

        $scope.updateUser = function () {
            $scope.error = ""

            var editUser = $scope.profile;

            if ((editUser.fullName == null) || (editUser.email == null) || (editUser.birthdate == null) || (editUser.height == null) || (editUser.weight == null)) {
                $scope.error = "Please make sure the fields are filled out correctly";
            } else {
                editUser.birthdate = textToDate(editUser.birthdate)
                $http.put("/api/v1/users/" + editUser._id, editUser).then(function (response) {
                    $location.path("profile");
                });

            }
        }

        function textToDate(str) {
            var dt = str.substring(6, 10) + '-' + str.substring(3, 5) + '-' + str.substring(0, 2)
            var date1 = new Date(dt);
            return date1;
        }

        refresh();

    });