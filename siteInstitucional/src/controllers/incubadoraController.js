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
    incubadoraModel.cadastrar2(codigo)
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "\nHouve um erro ao realizar o cadastro do usuário! Erro: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
  })
}

function removerBebe(req, res) {
  var codigo = req.body.codigoServer;
  console.log('Pegando dados do ControleFluxo')
  if (codigo == undefined) {
    res.status(400).send("Seu codigo está indefinido!");
  } else {


    incubadoraModel
    .removerBebe(codigo)
    .then(function(resposta){
      res.json(resposta);
    incubadoraModel.removerBebe2(codigo);
    incubadoraModel.removerBebe3(codigo)

    })
    .catch(function(erro){
      console.error(erro);
      console.error("Houve um erro ao capturar os dados das incubadoras: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    })


  }
}

// select idBebe
// dtSaida ANTIGA
// update p livre
// insert
// update p ocupado
function trocarBebe(req, res) {
  var codigoNovo = req.body.codigoNovoServer;
  var codigoAntigo = req.body.codigoAntigoServer;

  console.log('Pegando dados do ControleFluxo')
  if (codigoNovo == undefined) {
    res.status(400).send("Seu codigo está indefinido!");
  }else if (codigoAntigo == undefined) {
    res.status(400).send("Seu codigo está indefinido!");
  } 
  else {


    incubadoraModel
    .removerBebe(codigoAntigo)
    .then(function(resposta){
      res.json(resposta);
    incubadoraModel.removerBebe2(codigoAntigo);
    incubadoraModel.removerBebe3(codigoAntigo);

    })
    .catch(function(erro){
      console.error(erro);
      console.error("Houve um erro ao capturar os dados das incubadoras: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    })


  }
}

function trocarBebe2(req, res) {
  
  var codigoAntigo = req.body.codigoAntigoServer;
  var codigoNovo = req.body.codigoNovoServer;
  var fkBebe = req.body.fkBebeServer;

  console.log('Pegando dados do ControleFluxo')
  if (codigoNovo == undefined) {
    res.status(400).send("Seu codigo está indefinido!");
  }else if (fkBebe == undefined) {
    res.status(400).send("Seu fkBebe está indefinido!");
  } 
  else {


    incubadoraModel
    .removerBebe(codigoAntigo)
    .then(function(resposta){
      res.json(resposta);
      incubadoraModel.preencherIncubadora(codigoNovo);
      incubadoraModel.trocarBebe(fkBebe, codigoNovo);

    })
    .catch(function(erro){
      console.error(erro);
      console.error("Houve um erro ao capturar os dados das incubadoras: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    })


  }
}



function pegarIncubadoras(req, res) {
  incubadoraModel.pegarIncubadoras(req, res)
    .then(function (resposta) {
      res.json({
        resposta,
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

function capturarIncubadoras(req, res) {
  var idHospital = req.body.idHospitalServer;

  if(idHospital == undefined) res.status(400).send("O seu idHospital está undefined");
  else {
    incubadoraModel.capturarIncubadoras(idHospital)
    .then(function(resposta){
      res.json(resposta)
    })
    .catch(function(erro){
      console.error(erro);
      console.error("Houve um erro ao capturar os dados das incubadoras: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    })
  }
}








module.exports = {
  cadastrar,
  pegarIncubadoras,
  capturarIncubadoras,
  removerBebe,
  trocarBebe,
  trocarBebe2
};
