module.exports = function(sequelize, DataTypes) {
	return sequelize.define('concesionario', {
		ID_Concesionario: {
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
