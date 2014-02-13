var Hapi = require('hapi'),
	server = new Hapi.Server('0.0.0.0', 7676);

server.route([
	{ method: '*', 	path: '/{path*}', handler: { directory: { path: './static/', listing: false, redirectToSlash: true } } }
]);
server.start();

console.log('Server up');