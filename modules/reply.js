var high = 0.984;
var max = 0;
var avg = 0.06

function main(transObj, req, callback) {
	setStar(transObj, function(err, data){
		setSentiment(transObj, req, function(err, data2) {
			return callback(err, data2);
		});
	});
}

function setStar(transObj, callback) {
	if (transObj.userStatus == "star") {
		transObj.issue.description = "we are extremely sorry for your issue related to " + transObj.issue.category + ". here is an exclusive offer for you: " +transObj.uname+"150" + " afterall, customer delight is out motto. ";
	}
	return callback(null, transObj)
}

function setSentiment(transObj, req, callback) {
	for(var i=0; i<req.sentiment.length; ++i) if(req.sentiment[i].negative > max) max = req.sentiment[i].negative;
	if (max > high) transObj.issue.description = transObj.issue.description + ". we again apologize for all the trouble we caused you";
	return callback(null, transObj);
}

module.exports = {
	main: main
}