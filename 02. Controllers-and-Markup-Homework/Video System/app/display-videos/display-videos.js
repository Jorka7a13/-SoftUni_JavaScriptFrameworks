'use strict';

angular.module('videoSystem.displayVideos', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/display-videos', {
		templateUrl: 'app/display-videos/display-videos.html',
		controller: 'displayVideosController'
	});
}])

.controller('displayVideosController', ['$scope', 'videos', function($scope, videos) {
	var allVideos = videos.getAllVideos(),
	allCategories = [],
	allDates = [],
	filteredVideos;

	$scope.videos = allVideos;

	allVideos.forEach(function(el) {
		if (el.date != undefined) {
			var date = formatDate(el.date);
		}

		if (allCategories.indexOf(el.category) == -1 && el.category != undefined) {
			allCategories.push(el.category);
		}

		if (allDates.indexOf(date) == -1 && date != undefined) {
			allDates.push(date);
		}
	});
	
	$scope.allCategories = allCategories.sort();
	$scope.allDates = allDates.sort();

	$scope.applyCategoryFilter = function applyCategoryFilter() { //TODO MAKE FILTERS COMBINE!! OR WHEN CLICKED RESET OTHER FILTERS TO 'NOT SELECTED'!!
		filteredVideos = allVideos.filter(function(el) {          //TODO ADD VIEW ALL VIDEOS!!
			return el.category == $scope.categoryFilter;
		});

		$scope.videos = filteredVideos;
	}

	$scope.applyDateFilter = function applyDateFilter() {
		filteredVideos = allVideos.filter(function(el) {
			if (el.date != undefined) {
				return formatDate(el.date) == $scope.dateFilter;
			}
		});

		$scope.videos = filteredVideos;
	}

	$scope.applyHaveSubtitlesFilter = function applyHaveSubtitlesFilter() {
		filteredVideos = allVideos.filter(function(el) {
			return el.haveSubtitles == JSON.parse($scope.haveSubtitlesFilter);
		});

		$scope.videos = filteredVideos;
	}

	$scope.sortVideos = function sortVideos() {
		var sortCriteria = $scope.sortBy;

		$scope.videos.sort(function(firstElement, secondElement) {
			// SOME OF THE ELEMENTS MIGHT NOT HAVE THAT PROPERTY, AND SOME MAY HAVE IT!!! FIX IT!!!
			// if (firstElement[sortCriteria] != undefined || secondElement[sortCriteria] != undefined) {
				if (sortCriteria == 'length') {
					return firstElement[sortCriteria] - secondElement[sortCriteria];
				} else {
					return (firstElement[sortCriteria] > secondElement[sortCriteria]) ? 1 : ((secondElement[sortCriteria] > firstElement[sortCriteria]) ? -1 : 0);
				}
			// }
		});
	}

	$scope.addComment = function addComment(videoId) {
		var video = videos.getVideoById(videoId);

		$scope.comment.date = new Date(); // PARENT SCOPE PROBLEM??
		$scope.comment.likes = 0;

		if (video.comments == undefined) {
			video.comments = [];
		}

		video.comments.push($scope.comment);

		//Redraw videos
		console.log(videos.getAllVideos());
	}

	function formatDate(input) {
		var date = input.getDate(),
		monthIndex = input.getMonth(),
		year = input.getFullYear();

		var monthNames = [
			"January", "February", "March",
			"April", "May", "June", "July",
			"August", "September", "October",
			"November", "December"
		];

		if (date < 10) {
			date = '0' + date;
		}

		return monthNames[monthIndex] + " " + date + ", " + year;
	}
}]);