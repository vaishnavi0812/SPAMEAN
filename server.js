//modules 
var express = require('express');
var expobj = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
//backendconfiguration files
var db = require('C:/SPAMEAN/backendconfiguration/db');
//set port no.
var port = process.env.PORT || 8080;

//parse application/json
expobj.use(bodyParser.json());
//parse application/vnd.api+json
expobj.use(bodyParser.json({type: 'application/vnd.api+json'}));
//urlencoded
expobj.use(bodyParser.urlencoded({extended:true}));
//method overriding
expobj.use(methodOverride('X-HTTP-Method-Override'));
//defines rootdirectory for frontend
expobj.use(express.static(__dirname + '/public'));

//configure routes
require('C:/SPAMEAN/backendapp/routes')(expobj);

//on which port object is run
expobj.listen(port);

//after execution of code the console message will display
console.log('\nNode Server has started successfully');
console.log('\nTo check it open any web browser and type "localhost: '+port+'" and see the magic');


//Connection to MongoDB database
mongoose.connect('mongodb://localhost:27017/contactlist');

//TO on connection
//When it is connected 
mongoose.connection.on('connected', function(){
    console.log('Connected to database MongoDB');
});

//When there is an error
mongoose.connection.on('err', function(err){
    if(err){
        console.log("Error in database connection: "+err);
    }
});

//When it is disconnected
mongoose.connection.on('disconnected', function(){
    console.log("Disconnected from MongoDB database");
});

//When it is disconnected forcelly
process.on('SIGINT', function(){
    console.log("Disconnected from MongoDB through app termination");
    process.exit(0);
});

//to export expobj
exports = module.exports = expobj;