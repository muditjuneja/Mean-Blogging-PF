angular.module('ICF')
  .controller('UserController', function ($scope, localStorageService, toaster,UserService,$rootScope,$location) {
      $scope.showStatus = false;
      $scope.loadingStart = false;

      $scope.signup = function () {
          UserService.signup($scope.signupData)
          .success(function(response){
            $scope.loginData = {};
            $scope.loginData.email = $scope.signupData.email;
            $scope.loginData.password = $scope.signupData.password;
            $scope.grantAccess();
            $scope.signupData = "";
            toaster.pop('success', "Done !!", "Registration Successfull.You are being redireded");
          })
          .error(function(err){
              console.log(err);
              toaster.pop('error', "Error", "An Error has occured.Please try again after sometime.");
          });
      }

        $scope.grantAccess = function () {
        var data = { "email": $scope.loginData.email, "password": $scope.loginData.password};
         UserService.grantAccess(data)
          .success(function(response){
              console.log(response);
          localStorageService.set("token", response.token);
          localStorageService.set("user", response.user);
            $rootScope.isAuthenticated = true;
            $rootScope.user = response.user;
             $location.path("#/");
          })
          .error(function(err){
              console.log(err);
              toaster.pop('error', "Error", "An Error has occured.Please try again after sometime.");
          });
              
          }
  });