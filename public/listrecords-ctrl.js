angular.module("FitngrowApp")
    .controller("ListRecordsCtrl", function ($scope,$http){
        console.log("List controller initialized");

        function refresh(){
            $http.get("/api/v1/records").success(function (records){
                $scope.records = records;
            });
        }

        $scope.addRecord = function (){
            $http.post("/api/v1/records",$scope.newRecord).success(function (){
                refresh();
            });
        }

        $scope.deleteRecord = function (_id){
            $http.delete("/api/v1/records/"+_id).success(function (){
                refresh();
            });
        }

        refresh();

    });