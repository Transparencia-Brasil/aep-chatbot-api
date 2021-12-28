const { Model, DataTypes } = require('sequelize');

class Sic extends Model {
  static init(connection) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      uf: DataTypes.STRING,
      nivel: DataTypes.STRING,
      orgao: DataTypes.STRING,
      especifico: DataTypes.STRING,
      link: DataTypes.TEXT,
    }, {
      sequelize: connection,
      timestamps: false
    })
  }
}

module.exports = Sic;