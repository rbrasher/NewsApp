/**
 * Created by ron on 2/27/2015.
 */
'use strict';

app.factory('AuthService', function($firebaseSimpleLogin, FIREBASE_URL, $rootScope, $firebase) {
  var ref = new Firebase(FIREBASE_URL);
  var auth = $firebaseSimpleLogin(ref);

  var AuthService = {
    register: function(user) {
      return auth.$createUser(user.email, user.password);
    },
    createProfile: function(user) {
      var profile = {
        username: user.username,
        md5_hash: user.md5_hash
      };

      var profileRef = $firebase(ref.child('profile'));
      return profileRef.$set(user.uid, profile);
    },
    login: function(user) {
      return auth.$login('password', user);
    },
    logout: function() {
      auth.$logout();
    },
    resolveUser: function() {
      return auth.$getCurrentUser();
    },
    signedIn: function() {
      return !!AuthService.user.provider;
    },
    user: {}
  };

  $rootScope.$on('$firebaseSimpleLogin:login', function(e, user) {
    console.log(user.email + ' is logged in');
    angular.copy(user, Auth.user);
    AuthService.user.profile = $firebase(ref.child('profile').child(AuthService.user.uid)).$asObject();

    console.log(AuthService.user);
  });

  $rootScope.$on('$firebaseSimpleLogin:logout', function() {
    console.log('user logged out');

    //we must destroy the link to the user profile
    if(AuthService.user && AuthService.user.profile) {
      AuthService.user.profile.$destroy();
    }
    angular.copy({}, AuthService.user);
  });

  return AuthService;
});
