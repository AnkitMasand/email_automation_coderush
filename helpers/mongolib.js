var MongoClient = require('mongodb').MongoClient;
var db;

MongoClient.connect('mongodb://localhost:27017/test', function(err, data) {
    db = data;
    console.log("yayyyyyyyyyyyyyyyyyyyyy connected")
});

function get(collection, query, callback) {
    var collection = db.collection(collection);
    collection.findOne(query, function(err, data){
    	console.log("======================================= data ========================= ", data);
        return callback(err, data);
    });
}

module.exports = {
    get: get
}