angular.module('ICF')
  .controller('GetPostController', function ($scope,$sce, localStorageService, toaster,PostService,$routeParams ) {
var id = $routeParams.id;
PostService.getPost(id)
          .success(function(response){
              console.log(response);
              $scope.post = response;
              $scope.post.content = $sce.trustAsHtml($scope.post.content);
          })
          .error(function(err){
              console.log(err);
          });   
  });