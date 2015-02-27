/**
 * Created by ron on 2/27/2015.
 */
'use strict';

app.controller('AuthCtrl', function($scope, $location, AuthService, user) {
  if(user) {
    $location.path('/');
  }

  $scope.login = function() {
    AuthService.login($scope.user).then(function() {
      $location.path('/');
    }, function(error) {
      $scope.error = error.toString();
    });
  };

  $scope.register = function() {
    //first we are going to register the user, then we are going to log them in
    AuthService.register($scope.user).then(function(user) {
      return AuthService.login($scope.user).then(function() {
        user.username = $scope.user.username;
        return AuthService.createProfile(user);
      }).then(function() {
        $location.path('/');
      }, function(error) {
        $scope.error = error.toString();
      });
    });
  };

});
