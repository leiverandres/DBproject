module.exports = function(sequelize, DataTypes) {
  return sequelize.define('multa_ley' {
    ID_Multa_Ley: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    ID_Ley_infringida: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    freezeTableName: true
  })
}
