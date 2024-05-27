var bebeModel = require("../models/bebeModel");

function cadastrar(req, res) {
    var nome = nomeServer;
    var sobrenome = sobrenomeServer;
    var dtNasc = dtnascServer;
    var sexo = sexoServer;
    var prematuro = prematuroServer;
  
    if (nome == undefined) {
      res.status(400).send("Seu nome está indefinido!");
    } else if (sobrenome == undefined) {
      res.status(400).send("Seu sobrenome está indefinido!");
    } else if (emailFunc == undefined) {
      res.status(400).send("Seu email está indefinido!");
    } else if (senha == undefined) {
      res.status(400).send("Sua senha está indefinida!");
    }
  
    bebeModel
      .cadastrar(nome, sobrenome, dtNasc, sexo, prematuro)
      .then(function (resposta) {
        res.json(resposta);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro do usuário! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }

module.exports = {
  cadastrar,
};
