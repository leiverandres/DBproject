module.exports = function(sequelize, DataTypes) {
	return sequelize.define('personas', {
		NIT_Persona: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
		Nombres_Persona: {
			type: DataTypes.STRING,
			allowNull: false
		},
		Apellidos_Persona: {
			type: DataTypes.STRING,
			allowNull: false
		},
		Fecha_Nacimiento: {
			type: DataTypes.DATE,
			allowNull: false
		}
	},
	{
		timestamps: false,
		freezeTableName: true
	});
}
