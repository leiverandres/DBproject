module.exports = function(sequelize, DataTypes) {
	return sequelize.define('multas', {
		ID_Multa: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		Fecha_Multa: {
			type: DataTypes.DATE,
			allowNull: false
		},
		Importe_Multa: {
			type: DataTypes.DOUBLE,
			allowNull: false
		},
		Descripcion: {
			type: DataTypes.TEXT,
			allowNull: false
		}
	},
	{
		timestamps: false,
		freezeTableName: true
	});
}
//Pendientes las FOREIGN KEY
