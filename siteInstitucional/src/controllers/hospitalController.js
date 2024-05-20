var hospitalModel = require("../models/hospitalModel");

function cadastrar(req, res) {
  // razao, fantasia, cnpj, email, telefone, cep, numero  (variáveis para criar)
  var razao = req.body.razao;
  var fantasia = req.body.fantasia;
  var cnpj = req.body.cnpj;
  var email = req.body.email;
  var telefone = req.body.telefone;
  var cep = req.body.cep;
  var numero = req.body.numero;

  if (razao == undefined) {
    res.status(400).send("razao está undefined!");
  } else {
    hospitalModel
      .cadastrar(razao, fantasia, cnpj, email, telefone, cep, numero)
      .then(function (resultadoAutenticar) {
        console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
        console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

        if (resultadoAutenticar.length == 1) {

          console.log(resultadoAutenticar);
          res.json({resultadoAutenticar, 
            id: resultadoAutenticar[0].insertId});

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
  cadastrar
}