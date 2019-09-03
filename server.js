var express = require("express");
var path = require("path");
var logger = require("morgan");
var mongoose = require("mongoose");

var app = express();

var db = require("./modles");

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./routing/cheerio.js")(app, db);
require("./routing/ApiRoutes.js")(app, db);
require("./routing/otherFiles.js")(app, path);

mongoose.connect("mongodb://localhost/articles", { useNewUrlParser: true });

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
})

app.get("/saved/articles", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/save.html"))
})

var PORT = 3000 || process.env.PORT;

app.listen(PORT, () => {
    console.log("listening!");
})