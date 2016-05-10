module.exports = function(sequelize, DataTypes) {
	return sequelize.define('marcas', {
		ID_Marca: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		Nombre_Marca: {
			type: DataTypes.STRING,
			allowNul: false
		}
	}, 
	{
		timestamps: false,
		freezeTableName: true
	});	
}