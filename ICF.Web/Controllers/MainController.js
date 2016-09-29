angular.module('ICF')
  .controller('MainController', function ($scope,$rootScope, localStorageService, toaster,$location) {
      $scope.logout = function () {
          localStorageService.clearAll();
          $rootScope.isAuthenticated = false;
          $location.path("#/");
      }

  });