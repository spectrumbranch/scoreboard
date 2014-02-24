function pad(number, size) {
	var zeroesToAdd = 7 - size
	var newNumber = number
	for (var x = zeroesToAdd - 1; x >= 0; x--) {
		newNumber = "0" + newNumber
	};
	return newNumber
}

var app = angular.module('scoresApp',[])

function ScoreController($scope, $http){
	$http({method: 'GET', url: '/games/1/scores'}).success(function(data, status, headers, config) {
		$scope.currentPage = 0;
    	$scope.pageSize = 10;
		$scope.data = [];
		var counter = 1;
		for (var items in data.scores) {
			data.scores[items].id = counter
			counter = counter + 1
			$scope.data.push(data.scores[items])
			var val = $scope.data[items].value
			var valLen = val.toString().length
			$scope.data[items].value = pad(val,valLen)
		}
	})
}

app.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        if (input != undefined){
        	return input.slice(start);
        }
    }
});