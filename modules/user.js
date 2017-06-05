var async = require("async");
var mongo = require("../helpers/mongolib");

function main(input, callback) {
	getTransObject(input, function(err,data){
		console.log("================== get trans object returns with ==========", err, data);
		return callback(err, data);
	});
}

function getTransObject(params, callback) {
	async.waterfall([
		async.apply(getByBookingCode, params),
		getByPhone,
		getByEmail
	], function(err, data){
		console.log("============ waterfall returns ==========", err, data);
		if (!err || err == "found") return callback(null, data);
		return callback("no data found", null);
	});
}

function getByBookingCode(params, callback) {
	mongo.get("transObject", {"bookingCode": params.bookingCode}, function(err, data){
		console.log("================= bc returns ============== ", err, data);
		if (err || !data) return callback(null, params)
		return callback("found", data);
	})
}

function getByPhone(params, callback) {
	mongo.get("transObject", {"userPhone": params.phone}, function(err, data){
		console.log("================= phone returns ============== ", err, data);
		if (err || !data) return callback(null, params)
		return callback("found", data);
	})
}

function getByEmail(params, callback) {
	var emailId = params.contentEmail && params.contentEmail != "" ? params.contentEmail : params.from
	console.log("=============== get By email ===============", emailId);
	console.log("================== get by email params ", params);
	mongo.get("transObject", {"userEmail": emailId}, function(err, data){
		console.log("======== mongo get returns ==========", err, data);
		if (err || !data) return callback("not found", params)
		return callback("found", data);
	})
}

module.exports = {
	main: main
}

