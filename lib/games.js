var internals = {};
var db = require('./models');

exports.getScores = function getScores(input, cb) {
	var errorMessages = [];
	//test existence of required fields
	if (!input.gameid) {
		errorMessages.push('Object field "gameid" is required.');
	}

	if (errorMessages.length > 0) {
		callback(new Error(errorMessages));
	} else {
		db.Score.findAll({ where: { GameId: input.gameid }, include: [db.Game] }).success(function(scores) {
			var total_count = scores.length;
			var game_name = '';
			if (total_count > 0) {
				game_name = scores[0].game.name;
			}
			
			var _scores = [];
			
			for (var i = 0; i < total_count; i++) {
				_scores.push({ name: scores[i].name, value: scores[i].value, place: scores[i].place });
			}
			
			var output = { game_id: input.gameid, total_count: total_count, game_name: game_name, scores: _scores };

			cb(null, output);
		})
	}
	
}