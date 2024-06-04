var database = require("../database/config");

function cadastrar(fkBebe, fkCodigoDeSerie) {
    var instrucao = `
          INSERT INTO controleFluxo (fkBebe, fkCodigoDeSerie) VALUES
          ('${fkBebe}', '${fkCodigoDeSerie}');
      `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrar
};