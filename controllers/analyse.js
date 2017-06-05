var express = require('express');
var router = require('express').Router();
var async = require('async');

var preprocessor = require("../modules/preprocessor.js");
var user = require("../modules/user");
// var issue = require("../modules/issue");
// var reply = require("../modules/reply");

// var app = express();
// app.use(express.bodyParser());

router.post('/analyse',function(req,res){
	
	input = req.body;
		console.log(req.body);
		//console.log(typeof req.body);
	async.waterfall([  
		async.apply(preprocess, input),
		getUserInfo,
		getIssue
	], function(err, data) {
		console.log("========== main waterfall returns =========", err, data);
		if (err) res.send({"error": err}).status(500);
		res.send(data).status(200);
	});

	function preprocess(input, callback) {
		preprocessor.main(input, function(err, data){
			return callback(err, data);
		});
	}

	function getUserInfo(input, callback) {
		user.main(input, function(err, data){
			if (err) console.log("foobar");
			console.log("================== get user info main returns with ==============", err, data);
			return callback(err, data);
		});
	}

	function getIssue(input, callback) {
		console.log("get issue hittttttttttttttttttttttttttttttttttttttt");
		issue.main(userInfo, function(err,data){
			console.log("======================================== issue =======================", data);
			return callback(err, data);
		});
	}

	// function formReply(input, issues, userInfo, callback) {
	// 	reply.main(userInfo, function(err, data){
	// 		return callback(err, data);
	// 	});
	// }

});
module.exports = router;