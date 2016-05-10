module.exports = function(sequelize, DataTypes) {
	return sequelize.define('concesionarios_marca', {
		ID_Registro: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		Nombre_Marca: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, 
	{
		timestamps: false,
		freezeTableName: true
	});	
}
//Pendientes las FOREIGN KEY