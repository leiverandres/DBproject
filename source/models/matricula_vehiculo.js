module.exports = function(sequelize, DataTypes) {
	return sequelize.define('matriculas_vehiculo', {
		Matricula: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		ID_Modelo: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		Fecha_Matricula: {
			type: DataTypes.DATE,
			allowNull: false
		},
		NIT_Persona: {
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