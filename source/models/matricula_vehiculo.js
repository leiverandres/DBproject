module.exports = function(sequelize, DataTypes) {
	return sequelize.define('matriculas_vehiculo', {
		Matricula: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		Fecha_Matricula: {
			type: DataTypes.DATE,
			allowNull: false
		}
	},
	{
		timestamps: false,
		freezeTableName: true
	});
}
