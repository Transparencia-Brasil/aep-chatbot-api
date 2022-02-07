const { Model, DataTypes } = require('sequelize');

class Feedback extends Model {
  static init(connection) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      blip_userid: DataTypes.STRING,
      interacao: DataTypes.STRING,
      avaliacao: DataTypes.INTEGER,
      sugestao: DataTypes.STRING,
    }, {
      sequelize: connection,
      timestamps: true
    })
  }
}

module.exports = Feedback;