var app = app || {};

(function(scope) {
	var myAppModule = angular.module('myApp', []);

	myAppModule.controller('MainController', function($scope) {
		$scope.person = 
		{
		 	"name": "Pesho",
		 	"photo": "http://www.nakov.com/wp-content/uploads/2014/05/SoftUni-Logo.png",
		 	"grade": 5,
		 	"school": "High School of Mathematics",
		  	"teacher": "Gichka Pesheva",
		};
	});
})(app);