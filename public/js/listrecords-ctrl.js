angular.module("FitngrowApp")
    .controller("ListRecordsCtrl", function ($scope,$http){

        function refresh(){
            $http.get("/api/v1/records").success(function (records){
                $scope.records = records;
            });
        }

        refresh();

    });