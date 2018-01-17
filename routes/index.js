var express = require('express');
var mongoose  = require('mongoose');
var router = express.Router();

var userSchema = mongoose.Schema({
	email: String,
	password: String
})

var userModel = mongoose.model('users', userSchema);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect("/home");
});

router.get('/home', function(req, res, next) {
  res.render('template');
});

router.get('/auth',function(req,res,next){
	res.render('login');
})


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
