var hospitaisModel = require("../models/hospitaisModel");

function cadastrar(req, res) {
  // razao, fantasia, cnpj, email, telefone, cep, numero  (variáveis para criar)
  var razao = req.body.razaoServer;
  var fantasia = req.body.fantasiaServer;
  var cnpj = req.body.cnpjServer;
  var email = req.body.emailServer;
  var telefone = req.body.telefoneServer;
  var cep = req.body.cepServer;
  var numero = req.body.numeroServer;

  if (razao == undefined) {
    res.status(400).send("razao está undefined!");
  } else {
    hospitaisModel
      .cadastrar(razao, fantasia, cnpj, email, telefone, cep, numero)
      .then(function (resposta) {
        res.status(200).json(resposta);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log("\nHouve um erro ao realizar o cadastro do hospital! Erro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      });
  }
}

module.exports = {
  cadastrar,
};
