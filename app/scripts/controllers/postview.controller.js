/**
 * Created by ron on 2/27/2015.
 */
'use strict';

app.controller('PostViewCtrl', function($scope, $routeParams, PostService, AuthService) {
  $scope.post = PostService.get($routeParams.postId);
  $scope.comments = PostService.comments($routeParams.postId);

  $scope.user = AuthService.user;
  $scope.signedIn = AuthService.signedIn;

  $scope.addComment = function() {
    if(!$scope.commentText || $scope.commentText === '') {
      return;
    }

    var comment = {
      text: $scope.commentText,
      creator: $scope.user.profile.username,
      creatorUID: $scope.user.uid
    };

    $scope.comments.$add(comment);

    $scope.commentText = '';
  };

  $scope.deleteComment = function(comment) {
    $scope.comments.$remove(comment);
  };
});
