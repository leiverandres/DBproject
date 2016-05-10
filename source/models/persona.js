module.exports = function(sequelize, DataTypes) {
	return sequelize.define('personas', {
		NIT_Persona: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
		ID_Tipo_Persona: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		Nombres_Propietario: {
			type: DataTypes.STRING,
			allowNull: false
		},
		Apellidos_Propietario: {
			type: DataTypes.STRING,
			allowNull: false
		},
		Fecha_Nacimiento: {
			type: DataTypes.DATE,
			allowNull: false
		},
		ID_Direccion: {
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