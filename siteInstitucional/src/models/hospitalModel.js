var database = require("../database/config");

function cadastrar(razao, fantasia, cnpj, email, telefone, cep, numero) {
  var instrucao = `
        INSERT INTO hospital (razaoSocial, nomeFantasia, cnpj, email, telefone, cep, numero) VALUES ('${razao}', '${fantasia}', '${cnpj}', '${email}', '${telefone}', '${cep}', '${numero}');
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);  
  return database.executar(instrucao);
}

module.exports = {
  cadastrar
};