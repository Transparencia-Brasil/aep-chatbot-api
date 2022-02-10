const { Op, Sequelize } = require("sequelize");
const { Parser } = require("json2csv");

const Pedido = require("../models/Pedido");

module.exports = {
  async create(req, res) {
    try {
      const { pedido, blip_userid } = req.body;
      if (!pedido || !blip_userid) {
        res.status(400).json({ msg: "Dados inválidos" });
      }

      const resultado = await Pedido.create({
        email: "",
        pedido,
        blip_userid,
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

      const resultado = await Pedido.update(
        {
          email,
        },
        {
          where: {
            id,
          },
        }
      );
      return res.json({ msg: "Pedido atualizado com sucesso" });
    } catch (err) {
      console.log(err);
      return res.json({ msg: "Ops! Houve um erro." });
    }
  },

  async index(req, res) {
    try {
      const { formato } = req.query;
      const pedidos = await Pedido.findAll();

      if (formato === "csv") {
        const pedidosCSV = pedidos.map((p) => {
          return {
            usuario_blip: p.blip_userid,
            email: p.email,
            pedido: p.pedido,
            feito_em: p.updatedAt,
          };
        });
        const json2csv = new Parser();
        const csv = json2csv.parse(pedidosCSV);
        res.header("Content-Type", "text/csv");
        res.attachment("pedidos.csv");

        return res.send(csv);
      }

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
      console.log(err);
      return res.json({ msg: "Ops! Houve um erro." });
    }
  },

  async contatos(req, res) {
    try {
      const { formato } = req.query;
      const pedidos = await Pedido.findAll({
        where: {
          [Op.and]: [{ email: { [Op.ne]: null } }, { email: { [Op.ne]: "" } }],
        },
      });

      if (formato === "csv") {
        const pedidosCSV = pedidos
          .map((p) => {
            const data = new Date(p.updatedAt);
            return {
              usuario_blip: p.blip_userid,
              email: p.email,
              pedido: p.pedido,
              feito_em:
                data.getDate() +
                "/" +
                data.getMonth() +
                "/" +
                data.getFullYear() +
                " " +
                data.getHours() +
                ":" +
                data.getMinutes(),
            };
          })
          .filter((p) =>
            p.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g)
          );
        if (pedidosCSV.length) {
          const json2csv = new Parser();
          const csv = json2csv.parse(pedidosCSV);
          res.header("Content-Type", "text/csv");
          res.attachment("pedidos.csv");
          return res.send(csv);
        }
        return res.json({ msg: "Não foi possivel gerar CSV.", a: pedidosCSV });
      }

      return res.json(pedidos);
    } catch (err) {
      console.log(err);
      return res.json({ msg: "Ops! Houve um erro." });
    }
  },
};
