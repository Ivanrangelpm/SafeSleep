const { pegarStatusIncubadora } = require("../controllers/temperaturaController");
var database = require("../database/config");

function buscarUltimasTemperaturas(idHospital) {

    var instrucaoSql = `SELECT concat('Incubadora ', C.codigoDeSerie) as Incubadora, A.temperatura, A.dataHora
                            FROM historico as A
                            JOIN sensor as B ON B.idSensor = A.fkSensor
                            JOIN incubadora as C ON C.codigoDeSerie = B.fkIncubadora
                                join (SELECT codigoDeSerie, max(dataHora) as dataHora
                                FROM historico 
                                JOIN sensor ON idSensor = fkSensor
                                JOIN incubadora ON codigoDeSerie = fkIncubadora
                                WHERE fkHospital = 2
                                GROUP BY codigoDeSerie) as retorno on
                                C.codigoDeSerie = retorno.codigoDeSerie
                                and A.dataHora = retorno.dataHora
                            WHERE C.fkHospital = ${idHospital} AND status = 'Ocupado';`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function pegarStatusIncubadora(idHospital) {

    var instrucaoSql = `SELECT status, count(status) AS qtdIncubadoras FROM incubadora JOIN hospital
                            ON idHospital = fkHospital
                            WHERE idHospital = ${idHospital}
                            GROUP BY status;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasTemperaturas,
    pegarStatusIncubadora
}