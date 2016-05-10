module.exports = function(sequelize, DataTypes) {
	return sequelize.define('modelos', {
		ID_Modelo: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		Nombre_Modelo: {
			type: DataTypes.STRING,
			allowNull: false
		},
		Potencia: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		ID_Marca: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	}, 
	{
		timestamps: false,
		freezeTableName: true
	});	
}
//Pendientes las FOREIGN KEY