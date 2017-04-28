'use strict';

function config($httpProvider, $routeProvider){
  $routeProvider
  .when('/map', {
    controller: 'MapController',
    controllerAs: 'vm',
    templateUrl: '/templates/map.html'
  })
/*  .when('/', {
    controller: 'NavController',
    controllerAs: 'vm',
    templateUrl: '/index.html'
  })*/.
  when('/', {
    controller: 'signin',
    controllerAs: 'vm',
    templateUrl: '/templates/sign-in.html'
  })
  .otherwise({
    redirectTo: '/'
  });


}

module.exports = config;