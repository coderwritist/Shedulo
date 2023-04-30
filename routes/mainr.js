const express = require("express")
const router = express.Router()
const path = require("path")
const bp = require("body-parser")
router.use(bp.urlencoded({extended: true}));
const usercon = require("../controllers/usercon.js")


router.get("/login", function(req, res){
    res.sendFile(path.join(__dirname, "..", "/views", "/login.html"))
});


router.get("/register", function(req, res){
    res.sendFile(path.join(__dirname, "..", "/views", "/register.html"))
});

router.get("^/$|/index(.html)?", usercon.isAuth, function(req, res){
    res.sendFile(path.join(__dirname, "..", "/views", "/profile.html"))
});

router.get("/schedule", usercon.isAuth, function(req, res){
    res.sendFile(path.join(__dirname, "..", "/views", "/schedule.html"))
});




router.get("/getuser", usercon.isAuth, usercon.getuser);
router.get("/getalluser", usercon.isAuth, usercon.getalluser);
router.get("/logout", usercon.isAuth, usercon.logout);






router.post("/register", usercon.regcon);
router.post("/login", usercon.logincon);
router.post("/updateuser", usercon.isAuth, usercon.updateuser);
router.post("/updateslots", usercon.isAuth, usercon.updateslots);
router.post("/bookmeeting", usercon.isAuth, usercon.bookmeeting);






module.exports = router
