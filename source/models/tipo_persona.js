module.exports = function(sequelize, DataTypes) {
	return sequelize.define('tipos_persona', {
		ID_Tipo_Persona: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		Nombre_Tipo_Persona: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		}
	},
	{
		timestamps: false,
		freezeTableName: true
	});
}
