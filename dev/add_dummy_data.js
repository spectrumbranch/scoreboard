var db = require('../lib/models');
var async = require('async');


var scoreFn = function (inputScore, game, db) {
	var scoreName = inputScore.name;
	var scoreValue = inputScore.value;
	var scorePlace = inputScore.place;
	
	return function(cb) {
		db.Score.create({ name: scoreName, value: scoreValue, place: scorePlace}).success(function(score) {
			score.setGame(game);
			cb();
		});
	}
}


db.init([], function() {
    console.log('database setup complete');
	
	//1 game, 10 scores
	var scores = [
		{
			value: 1000000,
			name: 'CAB'
		},
		{
			value: 99999,
			name: 'SJP'
		},
		{
			value: 25041,
			name: 'MLR'
		},
		{
			value: 97648,
			name: 'CAB'
		},
		{
			value: 6751,
			name: 'REH'
		},
		{
			value: 497682,
			name: 'CAB'
		},
		{
			value: 11975,
			name: 'SJP'
		},
		{
			value: 514679,
			name: 'HAH'
		},
		{
			value: 123123,
			name: '123'
		},
		{
			value: 404404,
			name: 'LOL'
		}
	];
	var gameName = 'Example Game 2014!';
    
	db.Game.create({ name: gameName }).success(function(game) {
		var scoreCreators = [];
		
		for (var i = 0; i < scores.length; i++) {
			var scoreName = scores[i].name;
			var scoreValue = scores[i].value;
			var scorePlace = i+1;
			var theScore = { name: scoreName, value: scoreValue, place: scorePlace };
			
			scoreCreators.push(scoreFn(theScore, game, db));
		}
		
		async.parallel(scoreCreators, function(err, results) {
			//game.setScores(scoreObjects).success(function() {
				//k we're done
				console.log('done adding dummy data!')
			//})
		});
	});
});
