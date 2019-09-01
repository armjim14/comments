var express = require("express");
var path = require("path");
var logger = require("morgan");

var app = express();

require("./routing/routes.js")(app);
require("./routing/otherFiles.js")(app, path);

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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