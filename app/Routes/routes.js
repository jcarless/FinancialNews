var request = require('request');
var cheerio = require('cheerio');
var Article = require('../Model/Article.js');

module.exports = function(app) {

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

    // When fixed, this route will query db by id and return title and text
    app.get('/api/article/:id', function(req, res){
        Article.findOne({
            _id: req.params.id
        })
            .exec(function(err, article) {
                if(err) {
                    console.log(err);
                    //res.send('error occured')
                    return callback(err);
                } else {
                    var url = article.link;
                    console.log('url: ' + url);
                    request("http://www.cnbc.com/2016/05/30/feds-bullard-says-global-markets-seem-well-prepared-for-summer-rate-hike.html", function(error, response, html){
                        if(error) {
                            console.log(error);
                            //res.send('error occured')
                            return callback(error);
                        } else {
                            var $ = cheerio.load(html);
                            var data = {articleText:''};
                            data.article=article;
                            $('div.group').each(function(i, element){
                                articleText = $(this).children('p').text();
                                data.articleText += articleText;
                            });
                            console.log(data.article.title);
                        }
                    }); //request
                } //if/then/else
            }); //exec
    });// get

    // scrape cnbc.com and save to db
    app.get('/scrape', function(req, res){
        request('http://www.cnbc.com/', function(error, response, html) {
            var $ = cheerio.load(html);
            $('h3.headline').each(function(i, element) {

                var result = {};

                result.title = $(this).children('a').text();
                linkRaw = $(this).children('a').attr('href');
                result.link = "www.cnbc.com" + linkRaw;

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
    }); //get

};