module.exports = function(sequelize, DataTypes) {
	return sequelize.define('concesionario_marca', {
		ID_Registro: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		}
	},
	{
		timestamps: false,
		freezeTableName: true
	});
}
