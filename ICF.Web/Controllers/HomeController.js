angular.module('ICF')
  .controller('HomeController', function($scope, localStorageService, toaster, PostService) {
    var pageNo = 1;
    $scope.type = 'None';
    $scope.showLoadBtn = true;
    PostService.getPosts(pageNo)
      .success(function(response) {
        console.log(response);
        $scope.posts = response;
        //console.log($scope.posts);
      })
      .error(function(err) {
        console.log(err);
      });

    $scope.sortPosts = function(post) {
      var date = new Date(post.created);
      return date;
    };
    $scope.loadMore = function(){
      pageNo++;
      console.log(pageNo);
      PostService.getPosts(pageNo)
      .success(function(response) {
        if(response.length > 0){
        for (var i = 0; i < response.length; i++) {
        $scope.posts.push(response[i]);
        }}
        else
        {
           $scope.showLoadBtn = false;
        }
      })
      .error(function(err) {
        console.log(err);
      });
    }

$scope.$watch('type',function(newValue,old){
  if(newValue == 'None'){
    $scope.type = ''
  }
  
});
  });