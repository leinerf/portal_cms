var mongoose  = require('mongoose');
var userModel = require("./users.js");
var pagesModel = require("./pages.js");

mongoose.connect("mongodb://localhost/test");//
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('CONNECTED ON DATABASE');
});

userModels = [
	{
		email: "helloWorld1@gmail.com",
		password: "IdkaboutYou"
	},
	{
		email: "helloWorld2@gmail.com",
		password: "IdkaboutYou"
	},
	{
		email: "helloWorld3@gmail.com",
		password: "IdkaboutYou"
	},
	{
		email: "helloWorld4@gmail.com",
		password: "IdkaboutYou"
	}
]

pagesModels =[
	{
	author: "helloWorld1@gmail.com",
	title: "Something1",
	content:"qrqwerqwerqwer",
	url: "qpwoieh"
	},
	{
	author: "helloWorld2@gmail.com",
	title: "Something2",
	content:"qrqwerqwerqwer",
	url: "qpwoiehr"
	},
	{
	author: "helloWorld3@gmail.com",
	title: "Something3",
	content:"qrqwerqwerqwer",
	url: "qpwoie"
	},
	{
	author: "helloWorld1@gmail.com",
	title: "Something4",
	content:"qrqwerqwerqwer",
	url: "qpwoi"
	},
	{
	author: "helloWorld1@gmail.com",
	title: "Something5",
	content:"qrqwerqwerqwer",
	url: "qpwo"
	},
	{
	author: "helloWorld3@gmail.com",
	title: "Something6",
	content:"qrqwerqwerqwer",
	url: "qpwo"
	}

]


var createModels = function(model,content){

	for(var i = 0; i < content.length;++i){
		model.create(content[i], function(err, newModel){
		console.log(newModel);
		if(err){
			console.log(err);
		
		} else {
			console.log(newModel);
		
		}
	});
	}
};

createModels(userModel,userModels);
createModels(pagesModel,pagesModels);


