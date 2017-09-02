'use strict';
var http = require('http');
var path = require('path');
var express = require('express');
var myMongo = require('./myMongo');
var bodyParser = require('body-parser');
var requestIp = require('request-ip');

var yelp = require('yelp-fusion');
const clientId = process.env.YELP_ID;
const clientSecret = process.env.YELP_SECRET;

var app = express();
var server = http.createServer(app);

app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, 'views/dist')));

app.get('/bars/:location', (req, res) => {
    let location = req.params.location;
    yelp.accessToken(clientId, clientSecret).then(response => {
        const client = yelp.client(response.jsonBody.access_token);

        client.search({
            term: 'Bar',
            location: location
        }).then(response => {
            res.send(response.jsonBody.businesses);
        });
    }).catch(e => {
        console.log(e);
    });
})

app.get('/usersLocation/:user(*)', (req, res) => {
    myMongo.getUsersLocation(req.params.user, (err, data) => {
        if(err) throw err;

        res.send(data);
    })
})

app.post('/usersLocation', (req, res) => {
    myMongo.updateUsersLocation(req.body, (err, data) => {
        if(err) throw err;

        res.send(data);
    })
})

app.get('/goingCount', (req, res) => {
    myMongo.getBarsGoingCount((err, data) => {
        if(err) throw err;

        res.send(data);
    })
})

app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'views/dist/index.html'));
})

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", () => {
    var addr = server.address();
    console.log("Server listening at port", addr.address + ":" + addr.port);
})