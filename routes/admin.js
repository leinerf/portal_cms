var express = require("express");
var router = express.Router();
var mongoose  = require('mongoose');

var pagesSchema = mongoose.Schema({
	title: { type : String , unique : false, required : true },
	content: { type : String ,unique: false, required : true },
	url: { type : String ,unique: false, required : true }
});

var pagesModel = mongoose.model('pages', pagesSchema);

router.get('/',function(req,res,next){
	res.render("dashboard");
});

router.get('/addpage',function(req,res,next){
	res.render("editPage");
});

router.get('/editpage',function(req,res,next){
	res.render("editPage");
});

router.post('/addpage/',function(req,res,next){
	console.log(req.body);
	var formData ={
		title: req.body.title,
		content: req.body.content,
		url: req.body.url
	}
	console.log(formData);
	pagesModel.create(formData, function(err, newUser){
		console.log(newUser);
		if(err){
			console.log(err);
			res.json(err.message);
		} else {
			console.log(newUser);
			res.redirect('/')		
		}
	})
	

});

module.exports = router;