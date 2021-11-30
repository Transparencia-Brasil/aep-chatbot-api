const Recurso = require('../models/Recurso');

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
    const id = req.params.id
    const recurso = await Recurso.findByPk(id);

    return res.json(recurso);
  },
}