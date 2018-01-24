var express = require('express');
var userModel = require("../models/users.js");
var pagesModel = require("../models/pages.js");
var router = express.Router();

//data can be urlencoded key value pairs
//This should only have homepage,login, and register


/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect("/home");
});

router.get('/home', function(req, res, next) {
  res.render('landing',{link:"testing"});
});

router.get("/examples", function(req, res,next){
	res.render("landing",{link:"testing"});
});

router.get('/auth/login',function(req,res,next){
	res.render('login');
});
router.post('/auth/login',function(req,res,next){
		
		userModel.findOne({email: req.body.email2},function(err,foundUser){
			console.log("it went through here");
			if(err){
				console.log(err);
				res.render('login',{error:err});
			}
			else if(foundUser === null){
				res.render('login');
			}
			else if(req.body.password2 === foundUser.password){
				console.log("password works");
				req.session.user = foundUser;
				console.log('successful login')
				res.redirect('/admin');
			}
			else{
				res.render('login',{error:"wrong password"});
			}
		});
	
});

router.post('/auth/register',function(req,res,next){
	console.log(req.body);
	var formData ={
		email: req.body.email,
		password: req.body.password
	}
	console.log(formData);
	userModel.create(formData, function(err, newUser){
		console.log(newUser);
		if(err){
			console.log(err);
			res.json(err.message);
		} else {
			console.log(newUser);
			res.redirect('/auth/login')		
		}
	})
	

});

router.get('/auth/logout', function(req, res) {
  req.session.reset();
  res.redirect('/');
});

router.get('/test',function(req, res){
	var newUser = new userModel({
		email: "idfwy@people.com",
		password: "qwierqwer"
	});
	newUser.save(function(err,user){
		if(err){
			console.log(err);
		
		}
		else{
			console.log(user)
		
		}
	});
	res.end();
})

// router.get('/:pages',function(req, res){
// 	pagesmodel.findOne({
// 		url: req.params.page.trim()
// 	},
// 	function(err,foundPage){
// 		if(err){
// 			return res.send(err);
// 		}
// 		else if(foundPage){
// 			res.render("template", {
// 				title: foundPage.title,
// 				content: foundPage.content
// 			});
// 		} else {
// 			res.status(404).send("404 - Not found yo");
// 		}
// 	})
// });


module.exports = router;
