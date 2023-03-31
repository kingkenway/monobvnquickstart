const express = require("express");
const router = express.Router();

const controller = require("../controllers/controller.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { page: "Home", menuId: "home" });
});

router.post("/initiate", controller.bvnInitiate);
router.post("/verify", controller.verifyOtpDelivery);
router.post("/get-details", controller.fetchDetails);

module.exports = router;
