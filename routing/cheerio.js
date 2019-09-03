var axios = require("axios");
var cheerio = require("cheerio");

module.exports = (app, db) => {
    app.get("/articles", (req, res) => {
        axios.get("https://www.reddit.com/r/news/")
        .then((info) => {

            var $ = cheerio.load(info.data)

            var send = [];
            var send2 = [];
            var count = 0;

            $("a.SQnoC3ObvgnGjWt90zD9Z").each((i, elem) => {
                var title = $(elem).text();
                let run = true;
                db.articles.find({}, (err, data) => {
                    for( let v in data ){
                        if ( title == data[v].title ){
                            run = false;
                        }
                    }
                    if ( run ){
                        send.push(title)
                    }
                })
            })

            $("a.styled-outbound-link").each((i, elem) => {
                var href = $(elem).attr("href");
                let run = true;
                db.articles.find({}, (err, data) => {
                    for( let v in data ){
                        if ( href == data[v].href ){
                            run = false;
                        }
                    }
                    if ( run ){
                        send2.push(href);
                    }
                    if ( i == $("a.SQnoC3ObvgnGjWt90zD9Z").length - 1){
                        if (count == 0){
                            count++;
                            nextStep();
                        }
                    }
                })
            })

            function nextStep(){
                
                var fin = [];
    
                for( let i = 0; i < send.length; i++){
                    fin.push({title: send[i], href: send2[i]})
                }
    
                if( fin.length != 0 ){
                    for (let k in fin){
                        db.articles.create({title: fin[k].title, href: fin[k].href, comments: []})
                        .then((data) => {
                            return res.json(data)
                        })
                    }
                } else {
                    console.log("nothing to add")
                }

            }


        })
        .catch((err) => {
            console.log(err)
        });
    })
}