angular.module("FitngrowApp")
    .controller("CreateTraining", function ($scope, $http, $timeout) {

        refresh();

        $scope.startTraining = function () {
            $scope.newTraining.start = new Date();
            $scope.runningNow = true;

            var time = 0;
            var countUp = function () {

                var sec = time % 60;
                sec = Math.floor(sec);

                var min = (time % 3600) / 60;
                min = Math.floor(min);

                var hr = time / 3600;
                hr = Math.floor(hr);

                if (min < 10) {
                    min = "0" + min
                }

                if (sec < 10) {
                    sec = "0" + sec
                }

                if ($scope.runningNow) {
                    $scope.totalTime = hr + ":" + min + ":" + sec
                    time += 1;
                    $timeout(countUp, 1000);
                }
            }
            $timeout(countUp, 1);

        };
        $scope.endTraining = function () {
            $scope.newTraining.end = new Date();
            $scope.runningNow = false;

            $scope.totalTime = getTotalTime();
        };
        $scope.resetTraining = function () {
            refresh()
        };
        $scope.saveTraining = function () {
            var newTraining = $scope.newTraining;

            $http.post("/api/v1/trainings", newTraining).success((e) => {
                refresh();
            })

        };

        $scope.changeStatus = function(){
            var status = $scope.status;
            if( status == "pending" ){
                $scope.status = "started";
                $scope.startTraining();
            }
            if( status == "started"){
                $scope.status = "ended";
                $scope.endTraining();
            }
        };

        function refresh() {
            $scope.newTraining = {
                averageHeartRate: 0,
                calories: 0,
                distance: 0,
                start: null,
                end: null
            };
            $scope.totalTime = '0' + ":" + '00' + ":" + '00';
            $scope.status = "pending";
        }

        function getTotalTime() {
            var start = $scope.newTraining.start;
            var end = $scope.newTraining.end;
            var diff = end - start
            diff = new Date(diff)
            var sec = diff.getSeconds()
            var min = diff.getMinutes()
            var hr = diff.getHours() - 1
            if (min < 10) {
                min = "0" + min
            }
            if (sec < 10) {
                sec = "0" + sec
            }
            return hr + ":" + min + ":" + sec
        }


    });