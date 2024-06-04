var database = require("../database/config");

function cadastrar(codigo, modelo, fkHospital) {
    var instrucao = `
          INSERT INTO incubadora (codigoDeSerie, modelo, status, fkHospital) VALUES
          ('${codigo}', '${modelo}', 'Vazio',  ${fkHospital});
          `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function pegarIncubadoras() {
    var instrucao = `
    SELECT codigoDeSerie FROM incubadora WHERE status = "Vazio";
      `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function preencherIncubadora(codigoDeSerie) {
    var instrucao = `
    UPDATE incubadora SET status='Ocupado' WHERE codigoDeSerie='${codigoDeSerie}';
      `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function capturarIncubadoras(idHospital) {
  var instucao = `
    SELECT codigoDeSerie, status, nome FROM incubadora JOIN controleFluxo ON fkcodigoDeSerie = codigoDeSerie JOIN bebe ON fkBebe = idBebe WHERE status = "Ocupado" AND fkHospital = ${idHospital};
  `;

  return database.executar(instucao);
}

module.exports = {
    cadastrar,
    pegarIncubadoras,
    preencherIncubadora,
    capturarIncubadoras
};
