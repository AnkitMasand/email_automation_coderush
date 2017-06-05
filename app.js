var express = require("express");
var app = express();
var debug = require("debug")('app');
//require('./router.js').router(app);
var bodyParser = require("body-parser");
var async = require('async');
app.use(bodyParser.json());

var preprocessor = require("./modules/preprocessor.js");
var user = require("./modules/user");
var issue = require("./modules/issue");
var reply = require("./modules/reply");

//var config = require("./config/dev.json");
var config  ={
	port:8888
}
console.log("HI");


//var config =  require("./config");


var server = app.listen(config.port, function() {
    debug('Express server listening on port ' + server.address().port);
 });
app.get('/hello',function(err,data){
	return data.send("hello");
})

app.post('/analyse',function(req,res){
	
	input = req.body;
		console.log(req.body);
		//console.log(typeof req.body);
	async.waterfall([  
		async.apply(preprocess, input),
		getUserInfo,
		getIssue,
		formReply
	], function(err, data) {
		if (err) return res.send({"description": err}).status(200);
		return res.send(data).status(200);
	});

	function preprocess(input, callback) {
		preprocessor.main(input, function(err, data){
			return callback(err, data);
		});
	}

	function getUserInfo(input, callback) {
		user.main(input, function(err, data){
			console.log("user dataaaaaaaaaaaaaaaaaaaaaa", err, data);
			if (data == {} || data == null || err) return callback("please enter more details", null)
			return callback(err, data);
		});
	}

	function getIssue(input, callback) {
		issue.main(input, function(err,data){
			if (data.issue == {}) return callback("please enter more details", null)
			if (data.issue.category != req.body.category) return callback("please enter more details", null);
			return callback(err, data, req.body);
		});
	}

	function formReply(input, rq, callback) {
		reply.main(input, rq, function(err, data){
			return callback(err, data);
		});
	}

});