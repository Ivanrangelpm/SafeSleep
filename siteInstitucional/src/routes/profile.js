var express = require("express");
var router = express.Router();

var profileController = require("../controllers/profileController")

router.post("/renomear", function (req, res) {
    profileController.renomear(req, res);
});

module.exports = router;