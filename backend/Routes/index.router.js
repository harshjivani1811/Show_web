const express = require("express");
const router = express.Router();

router.use("/user",require("./User.router"));
router.use("/show",require("./Show.router"));
router.use("/category",require("./Category.router"))

module.exports = router;

