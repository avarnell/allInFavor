var app = angular.module('allInFavor', ['ngRoute'])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/partials/home.html',
        controller: 'HomeController'
      })
      .when('/create', {
        templateUrl: '/partials/create.html',
        controller: 'CreateController'
      })
      .when('/join', {
        templateUrl: '/partials/join.html',
        controller: 'JoinController'
      })
    $locationProvider.html5Mode(true);
  })