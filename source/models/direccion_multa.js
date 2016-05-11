module.exports = function(sequelize, DataTypes) {
	return sequelize.define('direccioes_multa', {
		ID_Direccion_Multa: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		Carretera: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		Kilometro: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	},
	{
		timestamps: false,
		freezeTableName: true
	});
}
