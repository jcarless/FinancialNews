var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var request = require('request');
var cheerio = require('cheerio');

var app = express();
var PORT = process.env.PORT || 3000;

// Schema
var Article = require('./app/Model/Article.js');

// Run Morgan for Logging
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

app.use(express.static('./public'));

// MongoDB Configuration configuration
mongoose.connect('mongodb://admin:admin@ds023912.mlab.com:23912/heroku_p165532t');
var db = mongoose.connection;

db.on('error', function (err) {
    console.log('Mongoose Error: ', err);
});

db.once('open', function () {
    console.log('Mongoose connection successful.');
});

//routing
require("./app/Routes/routes.js")(app);

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});