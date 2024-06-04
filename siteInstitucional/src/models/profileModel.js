var database = require("../database/config");

function renomear(nome, idUser) {
  var instrucao = `
        UPDATE usuario SET nome = '${nome}' WHERE idUsuario = ${idUser};
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  renomear
};