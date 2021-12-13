const { Op } = require('sequelize');

const Recurso = require('../models/Recurso');
const { verificarTermos } = require("../scripts/analisador");

module.exports = {
  async index(req, res) {
    try {
      const { resposta } = req.body;

      const termos = verificarTermos(resposta);
      let recursos = [];
      if (termos.length) {
        recursos = await Recurso.findAll({
          where: {
            id: {
              [Op.or]: termos
            }
          }
        });
      }
      res.json({
        identificouTermos: recursos.length > 0,
        termos: recursos
      });
    } catch (err) {
      console.log(err);
    }
  }
}