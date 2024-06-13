var database = require("../database/config");

function salvarConversa(idConversa, titulo, fkUsuario) {
    var instrucao = `
    INSERT INTO conversa (idConversa, titulo, fkUsuario) VALUES (${idConversa},'${titulo}', ${fkUsuario});
          `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function salvarComentarios(conversa, idConversa) {
    var instrucao = `
    INSERT INTO comentario (texto, fkConversa) VALUES `;
    instrucao += conversa.map((v) => `('${v}', ${idConversa})`).join(", ");
    instrucao += ";";
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function pegarConversas() {
    console.log("ACESSEI O BOBIA  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pegarConversa()");
    var instrucaoSql = `
        SELECT * FROM conversa;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function acessarConversa(idConversa) {
    var instrucao = `
    SELECT * FROM comentario where fkConversa = ${idConversa} order by idComentario;
          `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


module.exports = {
    salvarConversa,
    salvarComentarios,
    pegarConversas,
    acessarConversa
};


