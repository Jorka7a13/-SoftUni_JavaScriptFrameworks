'use strict';

// Declare app level module which depends on views, and components
angular.module('videoSystem', [
  'ngRoute',
  'videoSystem.displayVideos',
  'videoSystem.addVideo',
  'videoSystem.videos'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/display-videos'});
}]);
