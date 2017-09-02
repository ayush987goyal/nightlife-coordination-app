var mongodb = require('mongodb');
var ObjectId = require('mongodb').ObjectID;
var exports = module.exports = {};

var MongoClient = mongodb.MongoClient;
var dbUrl = process.env.MONGOLAB_URI;

exports.getBarsGoingCount = function (callback) {
    MongoClient.connect(dbUrl, (err, db) => {
        if(err) throw err;

        db.collection('barsGoingcount').find({

        }).toArray((err, docs) => {
            if(err) throw err;

            db.close();
            callback(null, docs);
        })
    })
}

exports.getUsersLocation = function (user, callback) {
    MongoClient.connect(dbUrl, (err, db) => {
        if(err) throw err;

        db.collection('barsUsersLocation').find({
            user: user
        }).toArray((err, docs) => {
            if(err) throw err;

            db.close();
            callback(null, docs);
        })
    })
}

exports.updateUsersLocation = function (userInfo, callback) {
    MongoClient.connect(dbUrl, (err, db) => {
        if (err) throw err;

        db.collection('barsUsersLocation').update({
            user: userInfo.user
        }, {
            $set: {
                location: userInfo.location
            }
        }, {
            upsert: true
        }, (err, data) => {
            if (err) throw err;

            db.close();
            callback(null, data);
        })
    })
}