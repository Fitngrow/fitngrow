angular.module("FitngrowApp")
    .controller("CreateTraining", function ($scope, $http, $timeout) {

        refresh();

        $scope.startTraining = function () {
            $scope.newTraining.start = new Date();
            $scope.newTraining.idUser = $scope.currentUser._id;
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
                    $scope.totalTime = hr + ":" + min + ":" + sec;
                    time += 1;
                    $timeout(countUp, 1000);
                }
            }
            $timeout(countUp, 1);

        };
        $scope.endTraining = function () {
            $scope.newTraining.end = new Date();
            var sport = $scope.sportselected;
            var calories = getCalories(sport);
            $scope.newTraining.calories = calories;
            var distance = getDistance(sport);
            $scope.newTraining.distance = distance;
            $scope.hideEnd = true;
            $scope.hideTrainingForm = false;
            runningNow = false;
            $scope.runningNow = false;

            $scope.totalTime = getTotalTime();
        };
        $scope.resetTraining = function () {
            refresh()
        };
        $scope.saveTraining = function () {
            var newTraining = $scope.newTraining;

            $http.post("/api/v1/trainings", newTraining).then(function (response) {
                refresh();
            });

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
            $http.get("/api/v1/sports").then(function (response) {
                var sports = response.data;
                var defaultSport = sports[0];
                $scope.newTraining = {
                    calories: 0.0,
                    distance: 0,
                    start: null,
                    end: null,
                    idSport: defaultSport._id
                };

                $scope.sports = sports;
                $scope.sportselected = defaultSport;
                $scope.totalTime = '0' + ":" + '00' + ":" + '00';
                $scope.status = "pending";
            });
        }

        function getTotalTime() {
            var start = $scope.newTraining.start;
            var end = $scope.newTraining.end;
            var diff = end - start;
            diff = new Date(diff);
            var sec = diff.getSeconds();
            var min = diff.getMinutes();
            var hr = diff.getHours() - 1;
            if (min < 10) {
                min = "0" + min
            }
            if (sec < 10) {
                sec = "0" + sec
            }
            return hr + ":" + min + ":" + sec
        }

        $scope.setSport = function (sport) {
            $scope.sportselected = sport;
            $scope.newTraining.idSport = sport._id;

            var calories = getCalories(sport);
            $scope.newTraining.calories = calories;

            var distance = getDistance(sport);
            $scope.newTraining.distance = distance;
        }

        function getCalories(sport) {
            var calories = 0.0;
            var timeMilliseconds = 0.0;

            calories = sport.defaultSpeed * 0.0175 * $scope.currentUser.weight;
            timeMinutes = ($scope.newTraining.end - $scope.newTraining.start) / 60000;
            calories = calories * timeMinutes;

            return Number(Number(calories).toFixed(2));
        }

        function getDistance(sport) {
            var distance = 0.0;

            var timeSeconds = ($scope.newTraining.end - $scope.newTraining.start) / 1000;
            var speed = sport.defaultSpeed * 1000;
            distance = (speed * timeSeconds) / 3600;

            return Number(Number(distance).toFixed(2));
        }

    });