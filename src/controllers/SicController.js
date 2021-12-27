const { Sequelize, Op } = require('sequelize');

const Sic = require("../models/Sic");

module.exports = {
  async index(req, res) {
    try {
      const sics = await Sic.findAll();
      return res.json(sics);
    } catch (err) {
      return res.json({ msg: "Ops! Houve um erro." });
    }
  },

  async get(req, res) {
    try {
      const id = req.params.id;
      const sic = await Sic.findByPk(id);

      return res.json(sic);
    } catch (err) {
      return res.json({ msg: "Ops! Houve um erro." });
    }
  },

  async search(req, res) {
    const { uf, nivel, orgao, especifico } = req.query;

    const whereClause = [];
    if (typeof uf !== 'undefined') {
      whereClause.push(Sequelize.where(
        Sequelize.fn('LOWER', Sequelize.col('uf')),
        {
          [Op.eq]: uf.toLowerCase()
        }
      ));
    }
    if (typeof nivel !== 'undefined') {
      whereClause.push(Sequelize.where(
        Sequelize.fn('LOWER', Sequelize.col('nivel')),
        {
          [Op.eq]: nivel.toLowerCase()
        }
      ));
    }
    if (typeof orgao !== 'undefined') {
      whereClause.push(Sequelize.where(
        Sequelize.fn('LOWER', Sequelize.col('orgao')),
        {
          [Op.eq]: orgao.toLowerCase()
        }
      ));
    }
    if (typeof especifico !== 'undefined') {
      whereClause.push(Sequelize.where(
        Sequelize.fn('LOWER', Sequelize.col('especifico')),
        {
          [Op.eq]: especifico.toLowerCase()
        }
      ));
    }

    const sics = await Sic.findAll({
      where: {
        [Op.and]: [
          whereClause
        ]
      }
    });

    return res.json(sics);
  },

};
