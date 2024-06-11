var express = require("express");
var router = express.Router();

var bobiaController = require("../controllers/bobiaController");

router.post("/salvarConversa", function (req, res) {
  bobiaController.salvarConversa(req, res);
})

router.post("/salvarComentarios", function (req, res) {
    bobiaController.salvarComentarios(req, res);
  })
router.post("/pegarConversas", function (req, res) {
    bobiaController.pegarConversas(req, res);
  })

router.post("/acessarConversa", function (req, res) {
    bobiaController.acessarConversa(req, res);
  });
  
 

  

module.exports = router;
