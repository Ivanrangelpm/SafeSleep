var express = require("express");
var router = express.Router();

var userController = require("../controllers/userController")

router.post("/cadastrar", function (req, res) {
    userController.cadastrar(req, res);
});

router.post("/autenticar", function (req, res) {
    userController.autenticar(req, res);
});

module.exports = router;
