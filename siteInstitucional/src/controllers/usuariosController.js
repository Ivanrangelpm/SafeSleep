var usuariosModel = require("../models/usuariosModel");

function cadastrar(req, res) {
  var nome = req.body.nomeServer;
  var sobrenome = req.body.sobrenomeServer;
  var emailRep = req.body.emailRepServer;
  var cpf = req.body.cpfServer;
  var licenca = req.body.licencaServer;
  var senha = req.body.senhaServer;
  var fkHospital = req.body.fkHospitalServer;

  if (nome == undefined) {
    res.status(400).send("Seu nome está indefinido!");
  } else if (sobrenome == undefined) {
    res.status(400).send("Seu sobrenome está indefinido!");
  } else if (emailRep == undefined) {
    res.status(400).send("Seu email está indefinido!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está indefinida!");
  }

  usuariosModel
    .cadastrar(nome, sobrenome, emailRep, cpf, licenca, senha, fkHospital)
    .then(function (resposta) {
      res.json(resposta);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "\nHouve um erro ao realizar o cadastro do usuário! Erro: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

function autenticar(req, res) {
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;

  if (email == undefined) {
    res.status(400).send("Seu email está indefinido!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está indefinida!");
  } else {
    usuariosModel
      .autenticar(email, senha)
      .then(function (resultadoAutenticar) {
        console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
        console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

        if (resultadoAutenticar.length == 1) {
          console.log(resultadoAutenticar);
          res.json({resultadoAutenticar, 
            nome: resultadoAutenticar[0].nome, 
            grupos: resultadoAutenticar[0].grupos });
            
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
  autenticar,
  cadastrar,
};
