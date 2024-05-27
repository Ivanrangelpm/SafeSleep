var incubadoraModel = require("../models/incubadoraModel");

function cadastrar(req, res) {
    var codigo = req.body.codigoServer;
    var modelo = req.body.modeloServer;
    var fkHospital = req.body.fkHospitalServer;
  
    if (codigo == undefined) {
      res.status(400).send("Seu codigo está indefinido!");
    } else if (modelo == undefined) {
      res.status(400).send("Seu modelo está indefinido!");
    }
  
    incubadoraModel
      .cadastrar(codigo, modelo, fkHospital)
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

  function pegarIncubadoras(req, res) {
    incubadoraModel.pegarIncubadoras(req, res)
    .then(function(resposta) {
      res.json({resposta,
      });
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
  pegarIncubadoras,
};
