module.exports = function(sequelize, DataTypes) {
    var Game = sequelize.define("Game", {
		name: {
			type: DataTypes.STRING(50)
		}
    }, {
        freezeTableName: true
    });
    return Game;
};