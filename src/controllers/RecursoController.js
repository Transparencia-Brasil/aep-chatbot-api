const { Op } = require('sequelize');

const Recurso = require("../models/Recurso");

module.exports = {
  async index(req, res) {
    try {
      const recursos = await Recurso.findAll();
      return res.json(recursos);
    } catch (err) {
      return res.json({ msg: "Ops! Houve um erro." });
    }
  },

  async get(req, res) {
    try {
      const id = req.params.id;
      const recurso = await Recurso.findByPk(id);

      return res.json(recurso);
    } catch (err) {
      return res.json({ msg: "Ops! Houve um erro." });
    }
  },

  async getByIds(req, res) {
    try {
      const param = req.params.ids;
      const ids = param.split(',');

      const recursos = await Recurso.findAll({
        where: {
          id: {
            [Op.or]: ids
          }
        }
      });

      return res.json(recursos);
    } catch (err) {
      console.log(err);
      return res.json({ msg: "Ops! Houve um erro." });
    }
  },
};
