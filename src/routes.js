const express = require('express');
const jwt = require('jsonwebtoken');

const UsuarioController = require('./controllers/UsuarioController');

const routes = express.Router();

routes.get('/', (req, res) => {
  return res.json({ status: 'OK'});
});

function checkToken(req, res, next) {
  const header = req.headers['authorization'];
  const token = header && header.split(' ')[1];
  if (!token) {
    return res.status(401).json({ msg: "Acesso negado" });
  }

  try {
    const secret = process.env.SECRET;
    jwt.verify(token, secret);
    next();
  } catch (error) {
    return res.status(400).json({ msg: "Token inválido" });
  }
}

routes.get('/usuarios', checkToken, UsuarioController.index);
routes.post('/usuarios/registrar', UsuarioController.register);
routes.post('/usuarios/login', UsuarioController.login);

module.exports = routes;