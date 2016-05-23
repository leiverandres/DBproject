module.exports = function(sequelize, DataTypes) {
  return sequelize.define('direccion', {
    ID_Direccion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Calle: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Numero: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Ciudad: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Departamento: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
      timestamps: false,
      freezeTableName: true // quitar plural automatico de las tablas
  });
}
