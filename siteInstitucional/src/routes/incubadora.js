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


module.exports = router;
