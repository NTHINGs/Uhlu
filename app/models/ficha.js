'use strict';
module.exports = function(sequelize, DataTypes) {
	//Define el modelo Ficha
	var Ficha = sequelize.define('Ficha', {
		nombreactividad: DataTypes.STRING,
		seccion: DataTypes.STRING,
		areadedesarrollo: DataTypes.STRING,
		objetivo: DataTypes.STRING,
		participantes: DataTypes.STRING,
		descripcion: DataTypes.TEXT,
		recomendaciones: DataTypes.STRING,
		materiales: DataTypes.TEXT,
		tiempos: DataTypes.STRING,
		fecha: DataTypes.DATE,
	}, {
		//set the timestamps to be underscored: (created_at, updated_at)
		underscored: true,
		classMethods: {
			associate: function(models) {
				Ficha.belongsTo(models.User,{
					onDelete: 'cascade',
					foreignKey: 'autor', 
					sourceKey: 'id'
				})
			}
		}
	});
	return Ficha;
};
