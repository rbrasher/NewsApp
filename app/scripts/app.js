/* global app:true */
/* exported app */

'use strict';

/**
 * @ngdoc overview
 * @name newsApp
 * @description
 * # newsAppApp
 *
 * Main module of the application.
 */
var app = angular.module('newsApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase'
  ])

  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        //templateUrl: 'views/home.html',
        //controller: 'MainCtrl'
        templateUrl: 'views/posts.html',
        controller: 'PostsCtrl'
      })
      //.when('/about', {
        //templateUrl: 'views/about.html',
        //controller: 'MainCtrl'
      //})
      .when('/posts', {
        templateUrl: 'views/posts.html',
        controller: 'PostsCtrl'
      })
      .when('/post/:postId', {
        templateUrl: 'views/post.view.html',
        controller: 'PostViewCtrl'
      })
      .when('/register', {
        templateUrl: 'views/register.view.html',
        controller: 'AuthCtrl',
        //we use the resolve property to define dependencies
        //that need to be resolved before our controller in instantiated
        resolve: {
          //we can inject this property into a controller if needed
          user: function(AuthService) {
            return AuthService.resolveUser();
          }
        }
      })
      .when('/login', {
        templateUrl: 'views/login.view.html',
        controller: 'AuthCtrl',
        resolve: {
          user: function(AuthService) {
            return AuthService.resolveUser();
          }
        }
      })
      .when('/users/:userId', {
        templateUrl: 'views/profile.view.html',
        controller: 'ProfileCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })

  .constant('FIREBASE_URL', 'https://innibucketlist.firebaseio.com/');
