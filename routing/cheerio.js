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
                            // console.log(data[v].title)
                            run = false;
                        }
                    }
                    // console.log(run)
                    if ( run ){
                        // console.log(title)
                        send.push(title)
                        // console.log(send)
                    }
                })
            })

            $("a.styled-outbound-link").each((i, elem) => {
                var href = $(elem).attr("href");
                let run = true;
                db.articles.find({}, (err, data) => {
                    for( let v in data ){
                        if ( href == data[v].href ){
                            // console.log(data[v].href)
                            run = false;
                        }
                    }
                    // console.log($("a.SQnoC3ObvgnGjWt90zD9Z").length)
                    if ( run ){
                        // console.log(href)
                        send2.push(href)
                        // var both = {title: send[send.length - 1], href}
                        // console.log(both)
                        // console.log(send2)
                    }
                    if ( i == $("a.SQnoC3ObvgnGjWt90zD9Z").length - 1){
                        if (count == 0){
                            count++;
                            console.log("okauy")
                            nextStep();
                        }
                    }
                })
            })

            function nextStep(){
                
                var fin = [];
    
                for( let i = 0; i < send.length; i++){
                    // console.log(i)
                    fin.push({title: send[i], href: send2[i]})
                }
    
                if( fin.length != 0 ){
                    for (let k in fin){
                        // console.log(fin[k])
                        db.articles.create({title: fin[k].title, href: fin[k].href, comments: []})
                        .then((data) => {
                            // console.log(' was added')
                            return res.json(data)
                        })
                    }
                } else {
                    console.log(" I am in the bottom ")
                }

            }


        })
        .catch((err) => {
            console.log(err)
        });
    })
}