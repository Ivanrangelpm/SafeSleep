var express = require("express");
var router = express.Router();

var incubadoraController = require("../controllers/incubadoraController");

router.post("/cadastrar", function (req, res) {
  incubadoraController.cadastrar(req, res);
})

router.post("/pegarIncubadoras", function (req, res) {
  incubadoraController.pegarIncubadoras(req, res);
})

router.post("/capturarIncubadoras", function (req, res) {
  incubadoraController.capturarIncubadoras(req, res);
})


router.post("/removerBebe", function (req, res) {
  incubadoraController.removerBebe(req, res);
})

router.post("/trocarBebe", function (req, res) {
  incubadoraController.trocarBebe(req, res);
})

router.post("/trocarBebe2", function (req, res) {
  incubadoraController.trocarBebe2(req, res);
})

module.exports = router;
