(function() {
    'use strict';
    angular.module('ICF').factory('PostService', postService);

    function postService($http, appSetting) {
        var baseUrl = appSetting.apiBaseUrl;

        function getPosts(pageNo) {
            return $http.get(baseUrl + "posts?page=" + pageNo);
        }

        function getPost(id) {
            return $http.get(baseUrl + "posts/" + id);
        }

        function addPost(postData, token) {
            return $http.post(baseUrl + "posts/", postData, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
        }

        var service = {
            getPosts: getPosts,
            addPost: addPost,
            getPost: getPost
        }
        return service;
    }
})();
