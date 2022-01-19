const { Model, DataTypes } = require('sequelize');

class Pedido extends Model {
  static init(connection) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      blip_userid: DataTypes.STRING,
      email: DataTypes.STRING,
      pedido: DataTypes.TEXT,
    }, {
      sequelize: connection,
      timestamps: true
    })
  }
}

module.exports = Pedido;