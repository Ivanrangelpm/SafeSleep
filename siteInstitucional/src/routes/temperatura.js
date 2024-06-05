var express = require("express");
var router = express.Router();

var temperaturaController = require("../controllers/temperaturaController");

router.get("/ultimas/:idHospital", function (req, res) {
    temperaturaController.buscarUltimasTemperaturas(req, res);
});

router.get("/status/:idHospital", function (req, res) {
    temperaturaController.pegarStatusIncubadora(req, res);
});

router.get("/prematuridade/:idHospital", function (req, res) {
    temperaturaController.verificarPrematuridade(req, res);
});

module.exports = router;