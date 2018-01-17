var express = require("express");
var router = express.Router();

router.get('/',function(req,res,next){
	res.render("dashboard");
});

router.get('/addpage',function(req,res,next){
	res.render("editPage");
});

router.get('/editpage',function(req,res,next){
	res.render("editPage");
});

module.exports = router;