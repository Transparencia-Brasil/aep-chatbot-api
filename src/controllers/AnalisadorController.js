const { Op } = require('sequelize');

const Recurso = require('../models/Recurso');
const { verificarTermos } = require("../scripts/analisador");

module.exports = {
  async index(req, res) {
    try {
      const { resposta } = req.body;

      const idsSigilo = [1,2,3];
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
      const sigilos = recursos.filter(e => idsSigilo.includes(e.id));
      const recursosSemSigilo = recursos.filter(e => !idsSigilo.includes(e.id));

      res.json({
        identificouTermos: recursosSemSigilo.length > 0,
        identificouSigilo: sigilos.length > 0,
        termos: recursosSemSigilo,
        sigilos: sigilos
      });
    } catch (err) {
      console.log(err);
    }
  }
}