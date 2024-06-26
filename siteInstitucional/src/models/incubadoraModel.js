var database = require("../database/config");

function cadastrar(codigo, modelo, fkHospital) {
    var instrucao = `
          INSERT INTO incubadora (codigoDeSerie, modelo, status, fkHospital) VALUES
          ('${codigo}', '${modelo}', 'Vazio',  ${fkHospital});
          `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function cadastrar2( codigo ) {
  var instrucao = `
        INSERT INTO sensor ( fkIncubadora) VALUES
        ( '${codigo}');
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
  SELECT C.codigoDeSerie as incubadora,B.idSensor as sensor, bebe.nome AS nome, A.temperatura, status, A.dataHora
                            FROM historico as A
							JOIN sensor as B ON B.idSensor = A.fkSensor
                            JOIN incubadora as C ON C.codigoDeSerie = B.fkIncubadora
                            JOIN controleFluxo ON fkcodigoDeSerie = C.codigoDeSerie
                            JOIN bebe ON fkBebe = idBebe
								join (SELECT codigoDeSerie, max(dataHora) as dataHora
                                FROM historico 
                                JOIN sensor ON idSensor = fkSensor
                                JOIN incubadora ON codigoDeSerie = fkIncubadora
                                WHERE fkHospital = ${idHospital}
                                GROUP BY codigoDeSerie) as retorno on
                                C.codigoDeSerie = retorno.codigoDeSerie
                                and A.dataHora = retorno.dataHora
                            WHERE C.fkHospital = ${idHospital} AND status = 'Ocupado';
  `;


  

  return database.executar(instucao);
}

function removerBebe(codigoDeSerie) {
  console.log(`CODIGO DE SERIE ${codigoDeSerie}`)
  var instrucaoSql = `
SELECT controleFluxo.*, bebe.nome, bebe.sobrenome FROM controleFluxo 
		JOIN bebe ON controleFluxo.fkBebe = bebe.idBebe 
        WHERE fkCodigoDeSerie = ${codigoDeSerie};
  `;


  console.log("Executando a instrução SQL: \n" + instrucaoSql);

  return database.executar(instrucaoSql);
}

function removerBebe2(codigoDeSerie) {
  console.log(`CODIGO DE SERIE ${codigoDeSerie}`)
  var instrucaoSql = `
  UPDATE controleFluxo SET dtSaida = current_timestamp() where fkCodigoDeSerie = ${codigoDeSerie};

  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);

  return database.executar(instrucaoSql);
}




function removerBebe3(codigoDeSerie) {
  console.log(`CODIGO DE SERIE ${codigoDeSerie}`)
  var instrucaoSql = `
  UPDATE incubadora SET status='Livre' WHERE codigoDeSerie= ${codigoDeSerie};

  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);

  return database.executar(instrucaoSql);
}


function trocarBebe(fkBebe, codigoNovo) {
  console.log(`CODIGO DE SERIE ${codigoNovo}`)
  var instrucaoSql = `
  INSERT INTO controleFluxo VALUES (default, ${fkBebe}, ${codigoNovo}, default, null);

  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);

  return database.executar(instrucaoSql);
}





module.exports = {
    cadastrar,
    cadastrar2,
    pegarIncubadoras,
    preencherIncubadora,
    capturarIncubadoras,
    removerBebe,
    removerBebe2,
    removerBebe3,
    trocarBebe
};
