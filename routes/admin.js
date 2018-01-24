var express = require("express");
var router = express.Router();
var moment = require('moment');
var pagesModel = require("../models/pages.js");
var isAuthenticated = require("../middleware/loginAuthentication.js");



router.use(isAuthenticated);


router.get('/',function(req,res,next){
	console.log(req.user)
	pagesModel.find({user: req.user._id},function(err,foundPages){
		if(err){
			console.log(err);
		}
		else if(foundPages == null || foundPages == undefined){
			res.redirect("/auth/login");
		}
		else{
			console.log(foundPages);
			res.render("dashboard",{pages:foundPages,moment:moment});
		}
	});
	
});

router.get('/addpage/',function(req,res,next){
	res.render("addPage",{page:{
				title:"Title",
				content:"Content"
				
			}});
});

router.get('/editPage/:id',function(req,res,next){
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
			res.render("editPage",{page: foundPage});
		}

	})
	
});

router.post('/editPage/:id',function(req,res,next){
	var formData = {
					title: req.body.title,
					content: req.body.content,
					url: req.body.url,
					date: Date.now()
				}
	pagesModel.findByIdAndUpdate(req.params.id,formData, function(err,foundPage){
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
			res.redirect('/admin')
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
			res.render("template",{page: foundPage});
		}

	})
	
});

router.post('/addpage/',function(req,res,next){
	console.log(req.body);
	var formData ={
		title: req.body.title,
		content: req.body.content,
		url: req.body.url,
		author: req.user,
		user: req.user._id
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

router.get('/delete/:id',function(req,res){
	pagesModel.deleteOne({_id:req.params.id},function(err){
	console.log("it goes her")
	if(err){
		console.log(err);
		res.send(err);
	}
	else{
		res.redirect('/admin')
	}
});

});
	

module.exports = router;

// app.use(function(req, res, next) {
//   if (req.session && req.session.user) {
//     User.findOne({ email: req.session.user.email }, function(err, user) {
//       if (user) {
//         req.user = user;
//         delete req.user.password; // delete the password from the session
//         req.session.user = user;  //refresh the session value
//         res.locals.user = user;
//       }
//       // finishing processing the middleware and run the route
//       next();
//     });
//   } else {
//     next();
//   }
// }); 