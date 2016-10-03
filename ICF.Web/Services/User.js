(function() {
    'use strict';
    angular.module('ICF').factory('UserService', userService);

    function userService($http, appSetting, $rootScope) {
        var baseUrl = appSetting.apiBaseUrl;

        function signup(signupData) {
            return $http.post(baseUrl + "users", signupData);

        }

        function grantAccess(loginData) {
            var data = {
                "email": loginData.email,
                "password": loginData.password
            };
            return $http.post(baseUrl + "login", data);
        }



        var service = {
            signup: signup,
            grantAccess: grantAccess
        }
        return service;
    }
})();