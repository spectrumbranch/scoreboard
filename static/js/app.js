function pad(number, size) {
	var zeroesToAdd = 7 - size
	var newNumber = number
	for (var x = zeroesToAdd - 1; x >= 0; x--) {
		newNumber = "0" + newNumber
	};
	return newNumber
}

var app = angular.module('scoresApp',[])

function setScores($scope, $http){
	$http({method: 'GET', url: 'games/1/scores'}).success(function(data, status, headers, config) {
		$scope.data = [];
		
		for (var items in data.scores){
			$scope.data.push(data.scores[items]);
		}
		for (var items in $scope.data){
			var value = $scope.data[items].value;
			var valueLength = value.toString().length;
			$scope.data[items].value = pad(value,valueLength)
		}

		for (x = 10; x <= $scope.data.length; x++) {
			console.log($("#Row" + x))
			$("#" + x).val()
		};

		var counter = $scope.data.length/10;
		setInterval(function(){
			if ($scope.data.length == counter * 10){
				counter = 1
			}
			else{
				counter = counter + 1
			}
			console.log(counter)
		},5000);

	});
}


