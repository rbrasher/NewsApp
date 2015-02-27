/**
 * Created by ron on 2/27/2015.
 */

'use strict';

app.controller('PostsCtrl', function($scope, $location, PostService, AuthService) {

  $scope.posts = PostService.all;
  $scope.user = AuthService.user;

  $scope.post = {url: 'http://', title: ''};

  /*
  $scope.submitPost = function() {
    PostService.create($scope.post).then(function(ref) {
      $location.path('/posts/' + ref.name());
    });
  };
  */

  //this method will redirect us to comment page for the post
  $scope.submitPost = function() {
    PostService.create($scope.post).then(function(ref) {
      $location.path('/posts/' + ref.name());
    });
  };

  $scope.deletePost = function(post) {
    PostService.delete(post);
  };

});
