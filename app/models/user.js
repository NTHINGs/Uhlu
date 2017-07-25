'use strict';
module.exports = function(sequelize, DataTypes) {
	//Define el modelo User
	var User = sequelize.define('User', {
		cum: DataTypes.STRING,
		seccion: DataTypes.STRING,
		grupo: DataTypes.INTEGER,
		provincia: DataTypes.STRING,
		facebookid: DataTypes.STRING,
		facebooktoken: DataTypes.STRING,
		facebookname: DataTypes.STRING,
		facebookemail: DataTypes.STRING,
	}, {
		//set the timestamps to be underscored: (created_at, updated_at)
		underscored: true,
		classMethods: {
			associate: function(models) {
				User.hasMany(models.Patrulla,{
					onDelete: 'cascade',
					foreignKey: 'autor', 
					sourceKey: 'id'
				});
				User.hasMany(models.Ficha,{
					onDelete: 'cascade'
				});
			}
		}
	});
	return User;
};
