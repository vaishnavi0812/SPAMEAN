// backend configuration

//use mangoose module
var mongoose = require('mongoose');

// create model of 'about' name
//module.exports allows us to pass to other files when it is called
module.exports = mongoose.model('About',{
	name : {type : String , default : ''}
});