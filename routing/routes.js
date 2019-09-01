var axios = require("axios");
var cheerio = require("cheerio");

module.exports = (app) => {
    app.get("/articles", (req, res) => {
        axios.get("https://www.reddit.com/r/news/")
        .then((info) => {

            var $ = cheerio.load(info.data)

            var send = [];
            var send2 = [];

            $("a.SQnoC3ObvgnGjWt90zD9Z").each((i, elem) => {
                var text = $(elem).text();
                // console.log(text);
                send.push(text);
            })

            $("a.styled-outbound-link").each((i, elem) => {
                var href = $(elem).attr("href");
                // console.log(href);
                send2.push(href);
            })

            var fin = [];

            send.map((info, i)=> {
                fin.push({title: info, href: send2[i]})
            })

            console.log(fin);
            res.json(fin);

        })
        .catch((err) => {
            console.log(err)
        });
    })
}