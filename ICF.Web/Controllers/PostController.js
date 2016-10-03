angular.module('ICF')
  .controller('PostController', function($scope, localStorageService, toaster, PostService) {
    //   $scope.types = ['Tech','Life','Hollywood','Entertainment']; 
    $scope.getPosts = function() {
      PostService.getPosts()
        .success(function(response) {
          $scope.posts = response;
        })
        .error(function(err) {
          console.log(err);
        });
    }


    $scope.addPost = function(post) {
      post.user = localStorageService.get("user")._id;
      PostService.addPost(post, localStorageService.get("token"))
        .success(function(response) {
          toaster.pop('success', "Done !!", "Your Post has been published");
        })
        .error(function(err) {
          console.log(err);
        });

    }
  });