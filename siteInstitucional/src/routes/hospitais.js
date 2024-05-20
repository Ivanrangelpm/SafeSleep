var express = require("express");
var router = express.Router();

var hospitalController = require("../controllers/hospitalController");

router.post("/cadastrar", function (req, res) {
  hospitalController.cadastrar(req, res);
})

module.exports = router;