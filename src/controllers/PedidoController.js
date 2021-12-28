const Pedido = require('../models/Pedido');

module.exports = {
  async create(req, res) {
    try {
      const { pedido } = req.body;
      if (!pedido) {
        res.status(400).json({ msg: "Dados inválidos" });
      }

      const resultado = await Pedido.create({
        email: "",
        pedido
      });
      return res.json(resultado);
    } catch (err) {
      console.log(err);
      return res.json({ msg: "Ops! Houve um erro." });
    }
  },

  async update(req, res) {
    try {
      const { id, email } = req.body;
      if (!(id && email)) {
        res.status(400).json({ msg: "Dados inválidos" });
      }

      const resultado = await Pedido.update({
        email
      }, {
        where: {
          id
        }
      });
      return res.json({ msg: "Pedido atualizado com sucesso" });
    } catch (err) {
      console.log(err);
      return res.json({ msg: "Ops! Houve um erro." });
    }
  },

  async index(req, res) {
    try {
      const pedidos = await Pedido.findAll();
      return res.json(pedidos);
    } catch (err) {
      console.log(err);
      return res.json({ msg: "Ops! Houve um erro." });
    }
  },

  async get(req, res) {
    try {
      const id = req.params.id;
      const pedido = await Pedido.findByPk(id);

      return res.json(pedido);
    } catch (err) {
      return res.json({ msg: "Ops! Houve um erro." });
    }
  },

}