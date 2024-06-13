var temperaturaModel = require("../models/temperaturaModel");

function buscarUltimasTemperaturas(req, res) {

    var idHospital = req.params.idHospital;

    console.log(`Recuperando as ultimas temperaturas`);

    temperaturaModel.buscarUltimasTemperaturas(idHospital).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas temperaturas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarUltimasTemperaturasLinhas(req, res) {

    var idHospital = req.body.idHospital;
    var codigo = req.body.codigo;
    var sensor = req.body.Sensor;

    console.log(`Recuperando as ultimas temperaturas`);

    temperaturaModel.buscarUltimasTemperaturasLinhas(idHospital, codigo, sensor).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas temperaturas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function pegarStatusIncubadora(req, res) {

    var idHospital = req.params.idHospital;

    console.log(`Recuperando os status das incubadoras`);

    temperaturaModel.pegarStatusIncubadora(idHospital).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas temperaturas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function verificarPrematuridade(req, res) {

    var idHospital = req.params.idHospital;

    console.log(`Recuperando os status das incubadoras`);

    temperaturaModel.verificarPrematuridade(idHospital).then(function (resultado) {
        if (resultado.length > 0) {
            // res.status(200).json(resultado);
            var lista_prematuridade = [];

            for(var index = 0; index < resultado.length; index++){
                lista_prematuridade.push(resultado[index].prematuridade[0]);
            }
            
            res.status(200).json(lista_prematuridade);
        
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas temperaturas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function inserirTemperaturasTeste(req, res){
    var temperatura = req.params.temperaturaServer;

    temperaturaModel.inserirTemperaturasTeste(temperatura)
    .then(function(resultado){
        res.json(resultado);
    })
    .catch(function(erro){
        console.error(erro);
        console.error('OLHA EU AKI')
    })
}

module.exports = {
    buscarUltimasTemperaturas,
    pegarStatusIncubadora,
    verificarPrematuridade,
    buscarUltimasTemperaturasLinhas,
    inserirTemperaturasTeste
}