const Sequelize = require('sequelize');
const config = require('../config/database');

const Usuario = require('../models/Usuario');
const Recurso = require('../models/Recurso');
const Sic = require('../models/Sic');

const connection = new Sequelize(config);

Usuario.init(connection);
Recurso.init(connection);
Sic.init(connection);

module.exports = connection;