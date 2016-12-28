angular.module("FitngrowApp")
    .controller("ProfileCtrl", function ($scope, $http) {
        function refresh() {
            var user = $scope.currentUser;
            var userId = user._id;
            $http.get("/api/v1/users/" + userId).then(function (response) {               
                $scope.user = response.data;               
            });         
            
        }

        refresh();

    });