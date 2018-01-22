var mongoose  = require('mongoose');
var pagesSchema = mongoose.Schema({
	author: {type: String, required: true},
	title: { type : String , unique : false, required : true },
	content: { type : String , required : true },
	url: { type : String ,unique: false, required : true }
});

var pagesModel = mongoose.model('pages', pagesSchema);

module.exports = pagesModel;