var bobiaModel = require("../models/bobiaModel");

function salvarConversa(req, res) {
  var titulo = req.body.tituloServer;
  var fkUsuario = req.body.fkUsuarioServer;
  var idConversa = req.body.idConversaServer;

  if (titulo == undefined) {
    res.status(400).send("Seu titulo está indefinido!");
  } else if (fkUsuario == undefined) {
    res.status(400).send("Seu fkUsuario está indefinido!");
  }else if(idConversa == undefined){
    res.status(400).send("Seu idConversa está indefinido!");
  }

  bobiaModel
    .salvarConversa(idConversa, titulo, fkUsuario)
    .then(function (resposta) {
        res.status(200).json(resposta);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log("\nHouve um erro ao salvar a conversa! Erro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      });
}

function salvarComentarios(req, res) {
  var idConversa = req.body.idConversa;
  var conversa = req.body.conversa;

  if (idConversa == undefined) {
    res.status(400).send("Seu idConversa está indefinido!");
  } else if (conversa == undefined) {
    res.status(400).send("Seu conversa está indefinido!");
  }
  bobiaModel
    .salvarComentarios(conversa, idConversa)
    .then(function (resposta) {
        res.status(200).json(resposta);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log("\nHouve um erro ao salvar o Comentario! Erro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      });
}



function pegarConversas(req, res) {

  bobiaModel.pegarConversas().then(function (resultado) {
    if (resultado.length > 0) {
        res.status(200).json(resultado);
    } else {
        res.status(204).send("Nenhum resultado encontrado!")
    }
}).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
});
}


function acessarConversa(req, res) {
  var idConversa = req.body.idConversaServer;


  if (idConversa == undefined) {
    res.status(400).send("Seu idConversa está indefinido!");
  } 
  bobiaModel
    .acessarConversa(idConversa)
    .then(function (resposta) {
        res.status(200).json(resposta);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log("\nHouve um erro ao acessar o comentario! Erro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      });
}





module.exports = {
    salvarConversa,
    salvarComentarios,
    pegarConversas,
    acessarConversa
};
