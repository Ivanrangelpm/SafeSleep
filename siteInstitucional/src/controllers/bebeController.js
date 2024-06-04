var bebeModel = require("../models/bebeModel");
var controleFluxoModel = require("../models/controleFluxoModel");
var incubadoraModel = require("../models/incubadoraModel");

function cadastrar(req, res) {
  var nome = req.body.nomeServer;
  var sobrenome = req.body.sobrenomeServer;
  var dtNasc = req.body.dtnascServer;
  var sexo = req.body.sexoServer;
  var prematuro = req.body.prematuroServer;
  var incubadora = req.body.incubadoraServer;

  if (nome == undefined) {
    res.status(400).send("Nome indefinido!");
  } else if (sobrenome == undefined) {
    res.status(400).send("Sobrenome indefinido!");
  } else if (dtNasc == undefined) {
    res.status(400).send("Data de Nascimento indefinida!");
  } else if (sexo == undefined) {
    res.status(400).send("Sexo indefinido!");
  } else if (prematuro == undefined) {
    res.status(400).send("Prematuridade indefinida!");
  } else if (sexo == undefined) {
    res.status(400).send("Incubadora indefinida!");
  }

  bebeModel
    .cadastrar(nome, sobrenome, dtNasc, sexo, prematuro)
    .then(function (resposta) {
      controleFluxoModel
        .cadastrar(resposta.insertId, incubadora)
        .then(function (respostaControleFluxo) {
          incubadoraModel
            .preencherIncubadora(incubadora)
            .then(function (respostaIncubadora) {
              res.status(201).json(resposta);
            }).catch(function (erro) {
              console.log(erro);
              console.log(
                "\nHouve um erro ao realizar o cadastro do bebê! Erro: ",
                erro.sqlMessage
              );
              res.status(500).json(erro.sqlMessage);
            });
        }).catch(function (erro) {
          console.log(erro);
          console.log(
            "\nHouve um erro ao realizar o cadastro do bebê! Erro: ",
            erro.sqlMessage
          );
          res.status(500).json(erro.sqlMessage);
        });
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "\nHouve um erro ao realizar o cadastro do bebê! Erro: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  cadastrar,
};
