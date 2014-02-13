var Hapi = require('hapi'),
	server = new Hapi.Server('0.0.0.0', 7676);

var Scoreboard = require('./lib');

server.route([
	{
		method: 'GET', path: '/games/{id}/scores', config: {
			handler: function(request, reply) {
				//var request = this;
				var gameid = request.params.id;

				Scoreboard.Games.getScores({gameid: gameid}, function(err, scores) {
					if (err) throw err;
					reply(scores);
				})

			}
		}
	},
	{ method: '*', 	path: '/{path*}', handler: { directory: { path: './static/', listing: false, redirectToSlash: true } } }
]);
server.start();

console.log('Server up');