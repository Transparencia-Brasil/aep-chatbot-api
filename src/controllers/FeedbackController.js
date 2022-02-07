const { Op } = require('sequelize');

const Feedback = require("../models/Feedback");

module.exports = {
  async index(req, res) {
    try {
      const feedbacks = await Feedback.findAll();
      return res.json(feedbacks);
    } catch (err) {
      return res.json({ msg: "Ops! Houve um erro." });
    }
  },

  async get(req, res) {
    try {
      const id = req.params.id;
      const feedback = await Feedback.findByPk(id);

      return res.json(feedback);
    } catch (err) {
      return res.json({ msg: "Ops! Houve um erro." });
    }
  },

  async create(req, res) {
    try {
      const { blip_userid, interacao, avaliacao } = req.body;
      if (!blip_userid || !interacao || !avaliacao) {
        res.status(400).json({ msg: "Dados inválidos" });
      }

      const resultado = await Feedback.create({
        blip_userid,
        interacao,
        avaliacao,
      });
      return res.json(resultado);
    } catch (err) {
      console.log(err);
      return res.json({ msg: "Ops! Houve um erro." });
    }
  },

  async update(req, res) {
    try {
      const { id, sugestao } = req.body;
      if (!id || !sugestao) {
        res.status(400).json({ msg: "Dados inválidos" });
      }

      const resultado = await Feedback.update({
        sugestao
      }, {
        where: {
          id
        }
      });
      return res.json({ registros: resultado[0] });
    } catch (err) {
      console.log(err);
      return res.json({ msg: "Ops! Houve um erro." });
    }
  },
};
