var axios = require("axios");
var cheerio = require("cheerio");

module.exports = (app, db) => {
    app.get("/articles", (req, res) => {
        axios.get("https://www.reddit.com/r/news/")
        .then((info) => {

            var $ = cheerio.load(info.data)

            $("a.SQnoC3ObvgnGjWt90zD9Z").each((i, elem) => {
                var title = $(elem).text();
                var href = "http://reddit.com"+$(elem).attr("href");
                let run = true;
                db.articles.find({}, (err, data) => {
                    for( let v in data ){
                        if ( title == data[v].title ){
                            run = false;
                        }
                    }
                    if ( run ){
                        db.articles.create({title, href, comments: [], change: true})
                        .then((data) => {
                            return res.json(data)
                        })
                    }
                })
            })

        })
    })
}