'use strict';

angular.module('videoSystem.addVideo', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/add-video', {
    templateUrl: 'app/add-video/add-video.html',
    controller: 'addVideoController'
  });
}])

.controller('addVideoController', ['$scope', '$location', 'videos', function($scope, $location, videos) {
	$scope.addVideo = function addVideo() {
		if (!$scope.video.hasOwnProperty('haveSubtitles')) {
			$scope.video.haveSubtitles = false;
		}

		videos.addVideo($scope.video);
		$location.path('/display-videos');
	}
}]);