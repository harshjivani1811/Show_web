const express = require("express");
const { getcategory, getAllcategory, updatecategory, deletecategory, createcategory } = require("../Controller/Category.controller");
const { validateToken } = require("../Controller/User.controller")
const router = express.Router();

router.post("/createcategory",createcategory);
router.post("/getcategory",getcategory);
router.get("/getallcategory",getAllcategory);
router.put("/updatecategory",updatecategory);
router.delete("/deletecategory",deletecategory);

module.exports = router;