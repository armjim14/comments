function Apis(app, db){
    
    app.get("/api/comments", (req, res) => {
        db.articles.find({})
            .populate("comments")
            .then((data) => {
                res.json(data)
            }).catch((err) => {
                console.log(err);
                res.send("Something went wrong")
            })
    })

    app.post("/api/submit/comments", (req, res) => {
        var comment = req.body.comment;
        console.log(comment)
        db.comments.create({comment})
        .then((data) => {
            return db.articles.findOneAndUpdate({}, { $push: { notes: data._id } }, { new: true });
        })

    })

}

module.exports = Apis;