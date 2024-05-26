var express = require("express");
var router = express.Router();

var incubadoraController = require("../controllers/incubadoraController");

router.post("/cadastrar", function (req, res) {
  incubadoraController.cadastrar(req, res);
})

module.exports = router;
