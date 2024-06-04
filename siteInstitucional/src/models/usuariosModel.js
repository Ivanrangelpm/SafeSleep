var database = require("../database/config");

function cadastrar(nome, sobrenome, email_representante, cpf, licenca, senha, cargo, fkHospital) {
  var instrucao = `
        INSERT INTO usuario (login, senha, cpf, nome, sobrenome, licenca, cargo, fkHospital) VALUES
        ('${email_representante}', '${senha}', '${cpf}', '${nome}', '${sobrenome}', '${licenca}', '${cargo}', ${fkHospital});
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function autenticar(email, senha) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    email,
    senha
  );
  var instrucaoSql = `
  SELECT idUsuario, nome, login, senha, fkHospital, razaoSocial FROM usuario JOIN hospital ON idHospital = fkHospital WHERE login = '${email}' AND senha = '${senha}' ;
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  cadastrar,
  autenticar,
};
