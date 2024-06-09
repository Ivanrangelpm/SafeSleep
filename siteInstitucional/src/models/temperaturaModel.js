//const { pegarStatusIncubadora } = require("../controllers/temperaturaController");
//const { verificarPrematuridade } = require("../controllers/temperaturaController");
var database = require("../database/config");

function buscarUltimasTemperaturas(idHospital) {

    var instrucaoSql = `SELECT concat('Incubadora ', C.codigoDeSerie) as Incubadora, A.temperatura, A.dataHora
    FROM historico as A
    JOIN sensor as B ON B.idSensor = A.fkSensor
    JOIN incubadora as C ON C.codigoDeSerie = B.fkIncubadora
        JOIN (SELECT codigoDeSerie, max(dataHora) as dataHora
        FROM historico 
        JOIN sensor ON idSensor = fkSensor
        JOIN incubadora ON codigoDeSerie = fkIncubadora
        WHERE fkHospital = ${idHospital}
        GROUP BY codigoDeSerie) as retorno on
        C.codigoDeSerie = retorno.codigoDeSerie
        and A.dataHora = retorno.dataHora
        WHERE C.fkHospital = ${idHospital} AND status = 'Ocupado';`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function buscarUltimasTemperaturasLinhas(idHospital, codigo, sensor) {

    var instrucaoSql = ` select temperatura, DATE_FORMAT(dataHora, '%H:%i:%s') as dataHora from historico join sensor on historico.fkSensor = idSensor join incubadora on fkIncubadora = codigoDeSerie join hospital on fkHospital = idHospital where idHospital = ${idHospital} and codigoDeSerie = ${codigo} and idSensor = ${sensor} order by dataHora desc limit 7;
      `;

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

function verificarPrematuridade(idHospital) {

    var instrucaoSql = `SELECT prematuridade, count(prematuridade) AS qtdBebes FROM bebe 
                            JOIN controleFluxo ON fkBebe = idBebe
                            JOIN incubadora ON fkCodigoDeSerie = codigoDeSerie
                            JOIN hospital ON fkHospital = idHospital
                                WHERE idHospital = ${idHospital}
                                GROUP BY prematuridade;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function inserirTemperaturasTeste(temperatura){
    var min1 = -1.5;
    var max1 = 1.5;
    var intervalo1 = max1 - min1;
    var diferenca1 = Number((Math.random() * intervalo1 + min1).toFixed(2));
    
    var min2 = -1.5;
    var max2 = 1.5;
    var intervalo2 = max2 - min2;
    var diferenca2 = Number((Math.random() * intervalo2 + min2).toFixed(2));

    var instrucaoSql = `
        INSERT INTO historico(temperatura, fkSensor) VALUES(${temperatura}, 1), (${Number(temperatura) + diferenca1}, 2), (${Number(temperatura) - diferenca2}, 3);
    `;

    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasTemperaturas,
    buscarUltimasTemperaturasLinhas,
    pegarStatusIncubadora,
    verificarPrematuridade,
    inserirTemperaturasTeste
}