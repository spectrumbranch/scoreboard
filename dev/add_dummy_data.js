var db = require('../lib/models');
var async = require('async');


var scoreFn = function (inputScore, game, db) {
	var scoreName = inputScore.name;
	var scoreValue = inputScore.value;
	
	return function(cb) {
		db.Score.create({ name: scoreName, value: scoreValue}).success(function(score) {
			score.setGame(game);
			cb();
		});
	}
}
//sort stuff needs to move to api read level
var scoreCompare = function(a,b) {
  return a.value < b.value;
}

db.init([], function() {
    console.log('database setup complete');
	
	//1 game, 10 scores + 90 loop generated
	var scores = [
		{
			value: 1000000,
			name: 'CAB'
		},
		{
			value: 999999,
			name: 'SJP'
		},
		{
			value: 250410,
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
			value: 0,
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
	for (var i = 0; i < 90; i++) {
		scores.push({ value: i*100, name: 'A'+i});
	}
	
	var gameName = 'Example Game 2014!';
	
	
    
	db.Game.create({ name: gameName }).success(function(game) {
		var scoreCreators = [];
		scores.sort(scoreCompare);
		for (var i = 0; i < scores.length; i++) {
			scoreCreators.push(scoreFn(scores[i], game, db));
		}
		
		async.parallel(scoreCreators, function(err, results) {
			//game.setScores(scoreObjects).success(function() {
				//k we're done
				console.log('done adding dummy data!')
			//})
		});
	});
});
