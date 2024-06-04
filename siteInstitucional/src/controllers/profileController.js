var profileModel = require("../models/profileModel");

function renomear(req, res) {
  var nome = req.body.nomeServer;
  var idUser = req.body.idUserServer;

  if (nome == undefined) {
    res.status(400).send("Seu nome está indefinido!");
  } else if (idUser == undefined) {
    res.status(400).send("Seu id está indefinido!");
  }
  profileModel
    .renomear(nome, idUser)
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
  renomear
};