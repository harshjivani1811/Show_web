const express = require("express");
const { signup,
        signin,
        signout,
        getuser,
        getAlluser,
        updateuser,
        deleteuser,
        validateToken
    } = require("../Controller/User.controller");
const router = express.Router();

router.post("/signup",signup);
router.post("/signin",signin);
router.get("/signout",signout);
router.post("/getuser",getuser);
router.get("/getalluser",getAlluser);
router.put("/updateuser",updateuser);
router.delete("/deleteuser",deleteuser)

module.exports = router;