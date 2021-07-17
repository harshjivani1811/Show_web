const express = require("express");
const{ uploadImage,
       createshow, 
       getshow, 
       getAllshow, 
       updateshow, 
       deleteshow
    } = require("../Controller/show.controller");

const {validateToken} = require("../Controller/User.controller")
const router = express.Router();

router.post("/image",uploadImage);
router.post("/createshow",createshow);
router.post("/getshow",getshow);
router.get("/getallshow",getAllshow);
router.put("/upadateshow",updateshow);
router.delete("/deleteshow",deleteshow)

module.exports = router;

