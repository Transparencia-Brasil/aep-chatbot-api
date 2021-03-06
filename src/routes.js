const express = require('express');
const jwt = require('jsonwebtoken');

const UsuarioController = require('./controllers/UsuarioController');
const AnalisadorController = require('./controllers/AnalisadorController');
const RecursoController = require('./controllers/RecursoController');
const SicController = require('./controllers/SicController');
const PedidoController = require('./controllers/PedidoController');
const FeedbackController = require('./controllers/FeedbackController');

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
routes.post('/analisador', checkToken, AnalisadorController.index);
routes.get('/recursos', checkToken, RecursoController.index);
routes.get('/recursos/:id', checkToken, RecursoController.get);
routes.get('/recursos/get/:ids', checkToken, RecursoController.getByIds);
routes.get('/sics', checkToken, SicController.index);
routes.get('/sics/pesquisar', checkToken, SicController.search);
routes.get('/pedidos', PedidoController.index);
routes.get('/pedidos/contatos', PedidoController.contatos);
routes.get('/pedidos/:id', checkToken, PedidoController.get);
routes.post('/pedidos', checkToken, PedidoController.create);
routes.put('/pedidos', checkToken, PedidoController.update);
routes.get('/feedbacks', checkToken, FeedbackController.index);
routes.post('/feedbacks', checkToken, FeedbackController.create);
routes.put('/feedbacks', checkToken, FeedbackController.update);

module.exports = routes;