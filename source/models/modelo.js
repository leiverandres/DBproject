module.exports = function(sequelize, DataTypes) {
	return sequelize.define('modelo', {
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
		}
	},
	{
		timestamps: false,
		freezeTableName: true
	});
}
