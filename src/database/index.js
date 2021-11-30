const Sequelize = require('sequelize');
const config = require('../config/database');

const Usuario = require('../models/Usuario');
const Recurso = require('../models/Recurso');

const connection = new Sequelize(config);

Usuario.init(connection);
Recurso.init(connection);

module.exports = connection;