var express = require("express");
var router = express.Router();
var pagesModel = require("../models/pages.js");



router.get('/',function(req,res,next){
	console.log(req.session.user)
	pagesModel.find({author: req.session.user},function(err,foundPages){
		if(err){
			console.log(err);
		}
		else if(foundPages == null || foundPages == undefined){
			res.redirect("/auth/login");
		}
		else{
			console.log(foundPages);
			res.render("dashboard",{pages:foundPages});
		}
	});
	
});

router.get('/addpage/',function(req,res,next){
	res.render("addPage",{page:{
				title:"Title",
				content:"Content"
				
			}});
});

router.get('/editpage/:id',function(req,res,next){
	pagesModel.findById(req.params.id,function(err,foundPage){
		if(err){
			console.log(err);
			res.json(err);
		}
		else if(foundPage == null){
			console.log("didnt find it");
			res.send("didnt find it");
		}
		else {
			console.log(foundPage);
			res.render("editPage",{page:{
				title:foundPage.title,
				content:foundPage.content
			}});
		}

	})
	
});


router.get('/showpage/:id',function(req,res,next){
	pagesModel.findById(req.params.id,function(err,foundPage){
		if(err){
			console.log(err);
			res.json(err);
		}
		else if(foundPage == null){
			console.log("didnt find it");
			res.send("didnt find it");
		}
		else {
			console.log(foundPage);
			res.render("template",{page:{
				title:foundPage.title,
				content:foundPage.content
			}});
		}

	})
	
});

router.post('/addpage/',function(req,res,next){
	console.log(req.body);
	var formData ={
		title: req.body.title,
		content: req.body.content,
		url: req.body.url,
		author: req.session.user
	}

	console.log(formData);
	pagesModel.create(formData, function(err, newUser){
		console.log(newUser);
		if(err){
			console.log(err);
			res.json(err.message);
		} else {
			console.log(newUser);
			res.redirect('/admin')		
		}
	})
	

});

module.exports = router;