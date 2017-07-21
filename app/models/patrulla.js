'use strict';
module.exports = function(sequelize, DataTypes) {
	//Define el modelo Patrulla
	var Patrulla = sequelize.define('Patrulla', {
		nombre: DataTypes.STRING,
		foto: DataTypes.TEXT,
	}, {
		//set the timestamps to be underscored: (created_at, updated_at)
		underscored: true,
		classMethods: {
			associate: function(models) {
				Patrulla.hasMany(models.Scout,{
					onDelete: 'cascade'
				});

				Patrulla.belongsTo(models.User)
			}
		}
	});
	return Patrulla;
};