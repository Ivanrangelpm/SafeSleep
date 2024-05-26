var funcionarioModel = require("../models/funcionarioModel");

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var sobrenome = req.body.sobrenomeServer;
    var emailFunc = req.body.emailFuncServer;
    var cpf = req.body.cpfServer;
    var licenca = req.body.licencaServer;
    var senha = req.body.senhaServer;
    var fkHospital = req.body.fkHospitalServer;
    var cargo = req.body.cargoServer;
  
    if (nome == undefined) {
      res.status(400).send("Seu nome está indefinido!");
    } else if (sobrenome == undefined) {
      res.status(400).send("Seu sobrenome está indefinido!");
    } else if (emailFunc == undefined) {
      res.status(400).send("Seu email está indefinido!");
    } else if (senha == undefined) {
      res.status(400).send("Sua senha está indefinida!");
    }
  
    funcionarioModel
      .cadastrar(nome, sobrenome, emailFunc, cpf, licenca, senha, cargo, fkHospital)
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
