'use strict';

/**
 * @ngdoc overview
 * @name favoritosApp
 * @description
 * # favoritosApp
 *
 * Main module of the application.
 */
angular
  .module('favoritosApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'controller'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
