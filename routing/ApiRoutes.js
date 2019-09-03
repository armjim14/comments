function Apis(app, db){

    app.get("/api/all/articles", (req, res) => {
        var topTen = [];
        db.articles.find({}, (err, data) => {
            for(let i = 0; i < 10; i++){
                topTen.push(data[i])
            }
        })
        .then(() => {
            var send = {articles: topTen}
            return res.json(send)
        })
    })

    app.get("/article/id/:id", (req, res) => {
        db.articles.find({_id: (req.params.id)}, (err, data) => {
            console.log(data);
            return res.json(data)
        })
    })

    app.post("/commment/id/", (req, res) => {
        console.log(req.body._id)
        console.log(req.body.comment)
        db.articles.update({_id: req.body._id}, {$push: {comments: req.body.comment}} , (err, data) => {
            console.log(data)
        })
    })

}

module.exports = Apis;