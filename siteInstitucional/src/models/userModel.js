var database = require("../database/config");

function autenticar(email, senha) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    email,
    senha
  );
  var instrucaoSql = `
  SELECT email, senha, usuario.nome, count(fkUsuario) AS grupos FROM usuario JOIN GrupoUsuario ON fkUsuario = idUsuario WHERE email = '${email}' AND senha = '${senha}' GROUP BY fkUsuario;
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrar(nome, sobrenome, email_representante, cpf, licenca, senha) {
  var instrucao = `
        INSERT INTO usuario (login, senha, cpf, nome, sobrenome, licenca) VALUES
        ('${email_representante}', '${senha}', '${cpf}', '${nome}', '${sobrenome}', '${licenca}');
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  cadastrar,
  autenticar,
};
