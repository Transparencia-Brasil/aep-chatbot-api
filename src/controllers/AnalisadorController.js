const { verificarTermos } = require("../scripts/analisador");

module.exports = {
  async index(req, res) {
    try {
      const { resposta } = req.body;

      const termos = verificarTermos(resposta);
      res.json({
        identificouTermos: termos.length > 0,
        termos
      });
    } catch (err) {
      console.log(err);
    }
  }
}