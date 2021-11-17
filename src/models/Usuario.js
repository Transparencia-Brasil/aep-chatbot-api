const { Model, DataTypes } = require('sequelize');

class Usuario extends Model {
  static init(connection) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome: DataTypes.STRING,
      senha: DataTypes.STRING,
    }, {
      sequelize: connection,
      timestamps: true
    })
  }

  static associate(models) {
    this.hasMany(models.Municipio, { foreignKey: 'codigo_uf', as : 'municipios' })
  }
}

module.exports = Usuario;