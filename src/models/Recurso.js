const { Model, DataTypes } = require('sequelize');

class Recurso extends Model {
  static init(connection) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      termo: DataTypes.STRING,
      descricao: DataTypes.STRING,
      descricaoLonga: DataTypes.STRING,
      recurso: DataTypes.TEXT,
    }, {
      sequelize: connection,
      timestamps: false
    })
  }
}

module.exports = Recurso;