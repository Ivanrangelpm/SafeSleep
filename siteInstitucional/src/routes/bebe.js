var express = require("express");
var router = express.Router();

var bebeController = require("../controllers/bebeController");

router.post("/cadastrar", function (req, res) {
  bebeController.cadastrar(req, res);
})

module.exports = router;
