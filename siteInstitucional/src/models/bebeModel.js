var database = require("../database/config");

function cadastrar(nome, sobrenome, nasc, sexo, prematuridade) {
    var instrucao = `
          INSERT INTO usuario (nome, sobrenome, nasc, sexo, prematuridade) VALUES
          ('${nome}', '${sobrenome}', '${nasc}', '${sexo}', ${prematuridade});
      `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrar
};