'use strict';

angular.module('videoSystem.videos', [])

.factory('videos', function() {

	var videos = [],
	id = 0;

	var getAllVideos = function getAllVideos() {
		return videos;
	}

	var addVideo = function addVideo(video) {
		video.id = id++;
		videos.push(video);
	}

	var getVideoById = function getVideoById(id) {
		return  videos.filter(function(video) {
			return video.id == id;
		});
	}

	return {
		getAllVideos: getAllVideos,
		addVideo: addVideo,
		getVideoById: getVideoById
	};
});