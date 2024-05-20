var express = require("express");
var router = express.Router();

var hospitaisController = require("../controllers/hospitaisController");

router.post("/cadastrar", function (req, res) {
  hospitaisController.cadastrar(req, res);
})

module.exports = router;
