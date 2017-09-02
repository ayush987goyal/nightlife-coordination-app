var mongodb = require('mongodb');
var ObjectId = require('mongodb').ObjectID;
var exports = module.exports = {};

var MongoClient = mongodb.MongoClient;
var dbUrl = process.env.MONGOLAB_URI;

function emptyBarsGoingCount(callback) {
    MongoClient.connect(dbUrl, (err, db) => {
        if (err) throw err;

        db.collection('barsGoingCount').remove({

        }, (err, data) => {
            if (err) throw err;

            db.close();
            callback(null, data);
        })
    })
}

exports.getBarsGoingCount = function (callback) {
    MongoClient.connect(dbUrl, (err, db) => {
        if (err) throw err;

        db.collection('barsGoingCount').find({

        }).toArray((err, docs) => {
            if (err) throw err;

            db.close();
            callback(null, docs);
        })
    })
}

exports.updateBarsGoingCount = function (goingData, callback) {
    MongoClient.connect(dbUrl, (err, db) => {
        if (err) throw err;

        db.collection('barsGoingCount').update({
            barId: goingData.barId
        }, {
            $set: {
                goingCount: goingData.goingCount,
                goingUsers: goingData.goingUsers
            }
        }, {
            upsert: true
        }, (err, data) => {
            if(err) throw err;

            db.close();
            callback(null, data);
        })
    })
}

exports.getUsersLocation = function (user, callback) {
    MongoClient.connect(dbUrl, (err, db) => {
        if (err) throw err;

        db.collection('barsUsersLocation').find({
            user: user
        }).toArray((err, docs) => {
            if (err) throw err;

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