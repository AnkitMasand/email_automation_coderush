function main(transObject, callback) {
	refundIssue = refund(transObject);
	offerIssue = offer(transObject);
	console.log("refundIssue", refundIssue);
	console.log("offerIssue", offerIssue);
	transObject.issue = refundIssue;
	if (refundIssue == {} || !refundIssue.hasOwnProperty("category")) {
		console.log("trueeeeeeeeeeeeeee");
		transObject.issue = offerIssue;
	}
	console.log("transss ", transObject.issue);
	return callback(null, transObject);
}

function refund(transObject) {

	var isEligibleForRefund = false;
	var sessionStatus = "ok";
	var descriptionString = ". We will process your refund soon. You can accept it in 10-12 working days";
	var issue = {};

	if (transObject.paymentStatus == "U" || (transObject.paymentStatus == "P" && transObject.commitStatus != "committed")) { // check for time too
		isEligibleForRefund = true;
		issue.category = "refund";
		issue.subCategory = "bt";
		issue.description = "it was an error by BookMyShow, ";
		issue.isRecoverable = false;
	} 

	if (!(transObject.emailStatus || transObject.smsStatus)) {
		isEligibleForRefund = true;
		issue.category = "refund";
		issue.subCategory = "nc";
		issue.description = "it was an error by BookMyShow, ";
		if (new Date() - transObject.eventDate < 0) issue.isRecoverable = true;
	}

	if (transObject.sessionStatus == "cancelled") {
		isEligibleForRefund = true;
		issue.category = "refund";
		issue.subCategory = "sc";
		issue.description = "the show was cancelled by cinema, ";
		issue.isRecoverable = false;
	}

	if (transObject.refundStatus == "processed") issue.description = issue.description + "The refund has been processed and the amount has been sent to your bank";

	if (isEligibleForRefund) {
		issue.description = issue.description + descriptionString;
	}

	return issue;
}

function offer(transObject,callback){
	
	var issue = {};
	issue.category= "offer";
	var data = transObject;
	
	if(data.offerValidity == "invalid"){
		console.log("offer invaliddddd =======================");
		issue.subCategory = "exp";
		issue.description = "we are sorry to inform you that the offer that you tried to use had already expired. ";
		issue.isRecoverable = false;
	}
	if(data.region != data.region){
		issue.subCategory = "reg";
		issue.description = " we are so sorry to inform you that the offer cant be applied on the region. ";
		issue.isRecoverable = false;
	}
	if(data.OfferQuota == 0){
		issue.subCategory ="invalid";
		issue.description = "we are sory to inform you that the offer quota is over. ";
		issue.isRecoverable = true;
	}

	return issue;
	
}

module.exports = {
	main: main
}