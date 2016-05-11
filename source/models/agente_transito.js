module.exports = function(sequelize, DataTypes) {
  return sequelize.define('agente_transito', {
    ID_Agente: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  },{
    timestamps: false,
    freezeTableName: true
  });
}
