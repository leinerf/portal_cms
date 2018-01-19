var express = require('express');
var mongoose  = require('mongoose');
var router = express.Router();

//data can be urlencoded key value pairs
var userSchema = mongoose.Schema({
	email: { type : String , unique : true, required : true },
	password: { type : String ,unique: false, required : true }
})

var userModel = mongoose.model('users', userSchema);



/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect("/home");
});

router.get('/home', function(req, res, next) {
  res.render('landing');
});

router.get('/auth/login',function(req,res,next){
	res.render('login');
});
router.post('/auth/login',function(req,res,next){
		console.log(req.body);
		userModel.findOne({email: req.body.email2},function(err,foundUser){
			console.log("it went through here");
			if(err){
				console.log(err);
				res.render('login');
			}
			else if(foundUser === null){
				res.render('login');
			}
			else if(req.body.password2 === foundUser.password){
				console.log('successful login')
				res.redirect('/admin');
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
			res.redirect('/admin/')		
		}
	})
	

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
module.exports = router;
