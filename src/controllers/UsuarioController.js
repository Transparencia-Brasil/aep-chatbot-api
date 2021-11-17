const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/Usuario');

module.exports = {
  async register(req, res) {
    try {
      const { nome, senha } = req.body;
      if (!(nome && senha)) {
        res.status(400).json({ msg: "Dados inválidos" });
      }

      const existente = await Usuario.findOne({ where: { nome: nome } });
      if (existente) {
        return res.status(409).json({ msg: "Usuário já existe" });
      }

      const salt = await bcrypt.genSalt(12);
      const hash = await bcrypt.hash(senha, salt);
      const usuario = await Usuario.create({
        nome,
        senha: hash,
      });
      return res.json({ msg: "Usuário registrado com sucesso" })
    } catch (err) {
      console.log(err);
      return res.json({ msg: "Ops! Houve um erro." });
    }
  },

  async login(req, res) {
    try {
      const { nome, senha } = req.body;
      if (!(nome && senha)) {
        res.status(400).json({ msg: "Dados inválidos" });
      }

      const usuario = await Usuario.findOne({ where: { nome: nome } });
      if (!usuario) {
        return res.status(409).json({ msg: "Usuário não encontrado" });
      }

      const checkSenha = await bcrypt.compare(senha, usuario.senha);
      if (!checkSenha) {
        return res.status(422).json({ msg: "Senha inválida" });
      }

      const secret = process.env.SECRET;
      const token = jwt.sign({ id: usuario.nome }, secret, { expiresIn: '12h' });

      return res.status(200).json({
        msg: "Autenticação realizada com sucesso",
        token,
      });
    } catch (err) {
      console.log(err);
      return res.json({ msg: "Ops! Houve um erro." });
    }
  },

  async index(req, res) {
    try {
      const usuarios = await Usuario.findAll({
        attributes: ["id", "nome", "createdAt", "updatedAt"]
      });
      return res.json(usuarios);
    } catch (err) {
      console.log(err);
      return res.json({ msg: "Ops! Houve um erro." });
    }
  }
}