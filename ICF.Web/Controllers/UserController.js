angular.module('ICF')
  .controller('UserController', function($scope, localStorageService, toaster, UserService, $rootScope, $location) {
    $scope.showStatus = false;
    $scope.loadingStart = false;

    $scope.signup = function() {
      UserService.signup($scope.signupData)
        .success(function(response) {
          toaster.pop('success', "Done !!", "Registration Successfull.You are being redireded");
          var data = {
            "email": $scope.signupData.email,
            "password": $scope.signupData.password
          };
          UserService.grantAccess(data)
            .success(function(response) {
              localStorageService.set("token", response.token);
              localStorageService.set("user", response.user);
              $rootScope.isAuthenticated = true;
              $rootScope.user = response.user;
              $location.path("#/");
            })
            .error(function(err) {
              console.log(err);
              toaster.pop('error', "Error", "An Error has occured.Please try again after sometime.");
            });
          $scope.signupData = "";

        })
        .error(function(err) {
          console.log(err);
          toaster.pop('error', "Error", "An Error has occured.Please try again after sometime.");
        });
    }

    $scope.grantAccess = function() {
      var data = {
        "email": $scope.loginData.email,
        "password": $scope.loginData.password
      };
      UserService.grantAccess(data)
        .success(function(response) {
          localStorageService.set("token", response.token);
          localStorageService.set("user", response.user);
          $rootScope.isAuthenticated = true;
          $rootScope.user = response.user;
          $location.path("#/");
        })
        .error(function(err) {
          console.log(err);
          toaster.pop('error', "Error", "An Error has occured.Please try again after sometime.");
        });

    }
  });