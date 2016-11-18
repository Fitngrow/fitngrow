angular.module("FitngrowApp")
    .controller("ListRecordsCtrl", function ($scope,$http){
        console.log("List controller initialized");

        function refresh(){
            $http.get("/api/v1/records").success(function (records){
                $scope.records = records;
            });
        }

        refresh();

    });