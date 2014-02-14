var Sequelize = require('sequelize');
var async = require('async');

var db_config_to_use = '';
switch (process.env.NODE_ENV) {
	case 'test':
    case undefined:
    case 'production':
    case 'development':
        db_config_to_use = '../../config/database';
        break;
}
var dbconfig = require(db_config_to_use).config;

var dbname = dbconfig.db;
var dbhostname = dbconfig.hostname;
var dbport = dbconfig.port;
var dbuser = dbconfig.user;
var dbpassword = dbconfig.password;

var sequelize = new Sequelize(dbname, dbuser, dbpassword, {
    host: dbhostname,
    port: dbport
});

//list all scoreboard models that will be loaded
var models = [
    {
        name: 'Game',
        file: 'game'
    },
	{
		name: 'Score',
		file: 'score'
	}
];

models.forEach(function(model) {
    module.exports[model.name] = sequelize.import(__dirname + '/' + model.file);
});

module.exports.init = function(virt_modules, done) {
    for (var i = 0; i < virt_modules.length; i++) {
        virt_modules[i].loadModels(module.exports);
    }
    (function(model) {

        //scoreboard associations
        model.Game.hasMany(model.Score);
        model.Score.belongsTo(model.Game);

		//testing config
		var syncConfig = {};
		switch (process.env.NODE_ENV) {
			case 'test_travis':
			case 'test':
				syncConfig = { force: true };
				break;
		}
		
        //create tables if they don't already exist
		async.parallel({
			game: function(cb) {
				model.Game.sync(syncConfig).success(function() {
					cb();
				}).error(function(error) { console.log('Error during Game.sync(): ' + error); });
			},
			score: function(cb) {
				model.Score.sync(syncConfig).success(function() {
					cb();
				}).error(function(error) { console.log('Error during Score.sync(): ' + error); });
			}
		}, function (errScoreboardSync, resultScoreboardSync) {
			done();
		});
            
    })(module.exports);
};

module.exports.sequelize = sequelize;