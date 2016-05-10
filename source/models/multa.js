module.exports = function(sequelize, DataTypes) {
	return sequelize.define('multas', {
		ID_Multa: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		NIT_Persona: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		Matricula: {
			type: DataTypes.STRING,
			allowNull: false
		},
		Fecha_Multa: {
			type: DataTypes.DATE,
			allowNull: false
		},
		ID_Agente: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		Importe_Multa: {
			type: DataTypes.DOUBLE,
			allowNull: false
		},
		ID_Direccion_multa: {
			type: DataTypes.INTEGER,
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