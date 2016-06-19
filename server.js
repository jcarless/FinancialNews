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
mongoose.connect('mongodb://admin:admin@ds057954.mlab.com:57954/businessnewsscrapperdb');
var db = mongoose.connection;

db.on('error', function (err) {
    console.log('Mongoose Error: ', err);
});

db.once('open', function () {
    console.log('Mongoose connection successful.');
});

//-------------------------------------------

// Main Route
app.get('/', function(req, res){
    res.sendFile('./public/index.html');
});

// Route to get all saved articles
app.get('/api/headlines', function(req, res) {

    var headlines = [];
    Article.find({})
        .exec(function(err, article){
            for(var i = 0; i < article.length; i++){
                headlines.push({title: article[i].title, id: article[i]._id});
            }
            res.send(headlines);
            console.log('headlines: ' + headlines);
        });
});

app.get('/scrape', function(req, res){
    request('http://www.cnbc.com/', function(error, response, html) {
        var $ = cheerio.load(html);
        $('h3.headline').each(function(i, element) {

            var result = {};


            result.title = $(this).children('a').text();
            linkRaw = $(this).children('a').attr('href');
            result.link = "www.cnbc.com" + linkRaw;

            console.log('result: ' + result);


            var entry = new Article (result);

            entry.save(function(err, doc) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(doc);
                }
            });

        }); //each
    }); //request
    res.redirect('/');
});




app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});