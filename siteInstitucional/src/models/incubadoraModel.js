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

module.exports = {
    cadastrar,
    pegarIncubadoras,
};
