module.exports = (app, path) => {

    app.get("/reset.css", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/reset.css"))
    })

    app.get("/news2.jpg", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/news2.jpg"))
    })

    app.get("/style.css", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/style.css"))
    })

    app.get("/logic.js", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/logic.js"))
    })

    app.get("/save.js", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/save.js"))
    })

}