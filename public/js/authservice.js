/**
 * Modulo que se encargará de la gestión de login, logout, status y registro.
 * Desarrollado por mjhea0 (https://github.com/mjhea0/mean-auth/blob/master/client/services.js)
 * Adaptado por AlbertFX91
 *
 * El sistema de $q y promises es para evitar los callback anidados y usar la notación .then
 */
angular.module('FitngrowApp').factory('AuthService',
    ['$q', '$timeout', '$http',
        function ($q, $timeout, $http) {
            // Variable usuario que almacenará el estado del usuario
            var user = null;
            var username = null;

            var apiroot = "/api/v1";
            // Devolvemos las funciones para usar en los controladores
            return ({
                currentUser: currentUser,
                existsUserName: existsUserName,
                isLoggedIn: isLoggedIn,
                getUserStatus: getUserStatus,
                login: login,
                logout: logout,
                register: register
            });
            // Función que nos indica si estamos logueados o no
            function currentUser() {
                return user;
            }

            function existsUserName() {
                return username;
            }

            // Función que nos indica si estamos logueados o no
            function isLoggedIn() {
                if (user) {
                    return true;
                } else {
                    return false;
                }
            }
            // Actualiza el estado de conexión del usuario.
            function getUserStatus(callback) {
                return $http.get(apiroot + '/users/service/status').then(
                    // handle success
                    function (response) {
                        if (response.data.status) {
                            user = response.data.user;
                        } else {
                            user = false;
                        }
                        if(callback) callback();
                    }).catch(
                    // handle error
                    function (response) {
                        user = false;
                    });
            }
            // Función que realiza el login del usuario
            function login(username, password) {
                // create a new instance of deferred
                var deferred = $q.defer();
                // send a post request to the server
                $http.post(apiroot + '/users/service/login',
                    { username: username, password: password }).then(
                    // handle success
                    function (response) {
                        if (response.status === 200 && response.data) {
                            user = response.data;
                            deferred.resolve();
                        } else {
                            user = false;
                            deferred.resolve();
                        }
                    }).catch(
                    // handle error
                    function (response) {
                        user = false;
                        deferred.resolve();
                    });
                // return promise object
                return deferred.promise;
            }

            // Logout del usuario
            function logout() {
                // create a new instance of deferred
                var deferred = $q.defer();
                // send a get request to the server
                $http.get(apiroot + '/users/service/logout').then(
                    // handle success
                    function (response) {
                        user = false;
                        deferred.resolve();
                    }).catch(
                    // handle error
                    function (response) {
                        user = false;
                        deferred.reject();
                    });
                // return promise object
                return deferred.promise;
            }

            // Función que realiza el login del usuario
            function register(newUser) {
                // create a new instance of deferred
                var deferred = $q.defer();
                $http.get(apiroot + '/users/service/existsUsername/' + newUser.username).then(
                    // handle success
                    function (response) {
                        if (response.data.status) {
                            username = true;
                            deferred.resolve();
                        } else {
                            username = false;
                            $http.post(apiroot + '/users/', newUser).then(
                                // handle success
                                function (response) {
                                    if (response.status === 201) {
                                        deferred.resolve();
                                    } else {
                                        deferred.reject();
                                    }
                                }).catch(
                                // handle error
                                function (response) {
                                    deferred.reject();
                                });
                        }
                    }).catch(
                    // handle error
                    function (response) {
                        deferred.reject();
                    });
                // return promise object
                return deferred.promise;
            }

        }]);