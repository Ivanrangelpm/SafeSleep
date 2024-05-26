var database = require("../database/config");

function cadastrar(nome, sobrenome, email, cpf, licenca, senha, cargo, fkHospital) {
    var instrucao = `
          INSERT INTO usuario (login, senha, cpf, nome, sobrenome, licenca, cargo, fkHospital) VALUES
          ('${email}', '${senha}', '${cpf}', '${nome}', '${sobrenome}', '${licenca}', '${cargo}', ${fkHospital});
      `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrar
};
