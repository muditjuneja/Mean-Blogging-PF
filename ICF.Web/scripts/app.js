'use strict';


var app = angular
    .module('ICF', [
        'ngRoute', 'summernote', 'LocalStorageModule', 'ngSanitize', 'angular-loading-bar', 'toaster', 'ngAnimate', 'infinite-scroll'
    ]);

app.run(function(localStorageService, $location, $rootScope, $http, appSetting, toaster) {
    $rootScope.types = ['None', 'Tech', 'Life', 'Hollywood', 'Entertainment', 'History', 'Bollywood', 'Mystery'];
    if (!localStorageService.get("token")) {
        $rootScope.isAuthenticated = false;
    } else {
        $rootScope.isAuthenticated = true;
        $rootScope.user = localStorageService.get("user");
    }
});
app.filter('ellipsis', function() {
    return function(text, length) {
        if (text.length > length) {
            return text.substr(0, length) + "<a href='#'>...</a>";
        }
        return text;
    }
});

app.filter('filterPosts', function() {
    return function(items, type) {
        if (type) {
            var filtered = [];
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (item.type == type) {
                    filtered.push(item);
                }
            }
            return filtered;
        } else
            return items;

    }
});

var apiBase = "http://127.0.0.1:8888/api/";
app.value("appSetting", {
    "apiBaseUrl": apiBase
});



app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/addpost', {
            templateUrl: 'views/addpost.html',
            controller: 'PostController',
            resolve: {
                "check": function($rootScope, $location) {
                    if (!$rootScope.isAuthenticated) {
                        $location.path("/");
                    }
                }
            }
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'UserController'
        })
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'HomeController'
        })
        .when('/post/:id', {
            templateUrl: 'views/post.html',
            controller: 'GetPostController'
        })
        .when('/upload/', {
            templateUrl: 'views/upload.html',
            controller: 'UploadFileController'
        })
        .otherwise({
            redirectTo: '/'
        });

});