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
            // Variable usuario que almacenará el usuario logueado
            var user = null;

            // Devolvemos las funciones para usar en los controladores
            return ({
                isLoggedIn: isLoggedIn,
                getUserStatus: getUserStatus,
                login: login,
                logout: logout,
                register: register
            });
            // Función que nos indica si estamos logueados o no
            function isLoggedIn() {
                if(user) {
                    return true;
                } else {
                    return false;
                }
            }
            // Actualiza el estado de conexión del usuario.
            function getUserStatus() {
                return $http.get('/users/service/me')
                // handle success
                    .success(function (data) {
                        if(data){
                            user = data;
                        } else {
                            user = data;
                        }
                    })
                    // handle error
                    .error(function (data) {
                        user = null;
                    });
            }
            // Función que realiza el login del usuario
            function login(username, password) {
                // create a new instance of deferred
                var deferred = $q.defer();
                // send a post request to the server
                $http.post('/users/service/login',
                    {username: username, password: password})
                // handle success
                    .success(function (data, status) {
                        if(status === 200 && data){
                            user = data;
                            deferred.resolve();
                        } else {
                            user = data;
                            deferred.reject();
                        }
                    })
                    // handle error
                    .error(function (data) {
                        user = null;
                        deferred.reject();
                    });
                // return promise object
                return deferred.promise;
            }

            // Logout del usuario
            function logout() {
                // create a new instance of deferred
                var deferred = $q.defer();
                // send a get request to the server
                $http.get('/users/service/logout')
                // handle success
                    .success(function (data) {
                        user = null;
                        deferred.resolve();
                    })
                    // handle error
                    .error(function (data) {
                        user = null;
                        deferred.reject();
                    });
                // return promise object
                return deferred.promise;
            }

            // Registro de un nuevo usuario
            function register(user) {
                // create a new instance of deferred
                var deferred = $q.defer();
                // send a post request to the server
                $http.post('/users/',user)
                // handle success
                    .success(function (data, status) {
                        if(status === 200){
                            deferred.resolve();
                        } else {
                            deferred.reject();
                        }
                    })
                    // handle error
                    .error(function (data) {
                        deferred.reject();
                    });
                // return promise object
                return deferred.promise;
            }
        }]);