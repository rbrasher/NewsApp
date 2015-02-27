/**
 * Created by ron on 2/27/2015.
 */
'use strict';

app.controller('NavCtrl', function($scope, $location, PostService, AuthService) {
  $scope.signedIn = AuthService.signedIn;
  $scope.logout = AuthService.logout;
  $scope.user = AuthService.user;

  $scope.post = {url: 'http://', title: ''};

  $scope.submitPost = function() {
    $scope.post.creator = $scope.user.profile.username;
    $scope.post.creatorUID = $scope.user.uid;

    PostService.create($scope.post).then(function(ref) {
      $location.path('/posts/' + ref.name());
      $scope.post = {url: 'http://', title: ''};
    });
  };
});
