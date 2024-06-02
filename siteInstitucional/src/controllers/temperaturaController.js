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

module.exports = {
    buscarUltimasTemperaturas,
    pegarStatusIncubadora
}