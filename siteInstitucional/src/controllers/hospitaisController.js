var hospitaisModel = require("../models/hospitaisModel");

function cadastrar(req, res) {
  // razao, fantasia, cnpj, email, telefone, cep, numero  (variáveis para criar)
  var razao = req.body.razaoServer;
  var fantasia = req.body.fantasiaServer;
  var cnpj = req.body.cnpjServer;
  var email = req.body.emailServer;
  var telefone = req.body.telefoneServer;
  var cep = req.body.cepServer;
  var numero = req.body.numeroServer;

  if (razao == undefined) {
    res.status(400).send("razao está undefined!");
  } else {
    hospitaisModel
      .cadastrar(razao, fantasia, cnpj, email, telefone, cep, numero)
      .then(function (resultadoAutenticar) {
        console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
        console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

        if (resultadoAutenticar.length == 1) {
          console.log(`resultado autenticar: ${resultadoAutenticar[0].insertId}`);
          res.json({
            insertId: resultadoAutenticar[0].insertId,
          });
        } else if (resultadoAutenticar.length == 0) {
          res.status(403).send("Email e/ou senha inválido(s)");
        } else {
          res.status(403).send("Mais de um usuário com o mesmo login e senha!");
        }
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o login! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

module.exports = {
  cadastrar,
};
