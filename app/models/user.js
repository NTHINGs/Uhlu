'use strict';
module.exports = function(sequelize, DataTypes) {
	//Define el modelo User
	var User = sequelize.define('User', {
		cum: DataTypes.STRING,
		seccion: DataTypes.STRING,
		grupo: DataTypes.INTEGER,
		provincia: DataTypes.STRING,
		email: DataTypes.STRING,
		password: DataTypes.STRING
	}, {
		//set the timestamps to be underscored: (created_at, updated_at)
		underscored: true,
		classMethods: {
			associate: function(models) {
				User.hasMany(models.Ficha,{
					onDelete: 'cascade',
					foreignKey: 'autor', 
					sourceKey: 'id'
				});
				User.hasMany(models.Patrulla,{
					onDelete: 'cascade'
				});
			}
		}
	});
	return User;
};
