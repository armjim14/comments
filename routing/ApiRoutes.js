const cheerio = require("cheerio");
const axios = require("axios")

function changeHref(link, id, db){
    axios.get(link)
    .then((resp) =>{
        var $ = cheerio.load(resp.data)
        console.log($("a.styled-outbound-link").attr("href"))
        db.articles.update({_id: id}, {$set: {change: false, href: $("a.styled-outbound-link").attr("href")}}, (err, data) => {
            console.log("better")
        })
    })
    .catch((err) => {
        console.log("Here")
        console.log(err)
    })
}

function Apis(app, db){

    app.get("/", (req, res) => {
        var topTen = [];
        db.articles.find({}, (err, data) => {
            var startLoop = data.length - 1;
            var numb = (data.length > 10) ? data.length - 11 : -1;
            console.log(data[startLoop])
            for(let i = startLoop; i > numb; i--){
                if (data[i].change && data[i] !== "undefined"){
                    changeHref(data[i].href, data[i]._id, db)
                }
            }
            for(let i = startLoop; i > numb; i--){
                topTen.push(data[i])
            }
        })
        .then(() => {
            var send = {articles: topTen}
            return res.render("index", send)
        })
    })

    app.get("/article/id/:id", (req, res) => {
        db.articles.find({_id: (req.params.id)}, (err, data) => {
            console.log(data);
            return res.json(data)
        })
    })

    app.post("/commment/id/", (req, res) => {
        db.articles.update({_id: req.body._id}, {$push: {comments: req.body.comment}} , (err, data) => {
            console.log(data)
        })
    })

}

module.exports = Apis;