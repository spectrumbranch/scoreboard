module.exports = function(sequelize, DataTypes) {
    var Score = sequelize.define("Score", {
		name: {
			type: DataTypes.STRING(3)
		},
        value: {
            type: DataTypes.INTEGER(7).UNSIGNED
        },
		place: {
			type: DataTypes.INTEGER(3).UNSIGNED
		}
    }, {
        freezeTableName: true
    });
    return Score;
};