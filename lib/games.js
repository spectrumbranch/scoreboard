var internals = {};

exports.getScores = function getScores(request, cb) {
	//TODO: get scores
	var id = request.gameid;
	cb(null, { game: id, scores: [] });
}