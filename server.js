var express = require("express");
var path = require("path");
var morgan = require("morgan");
var mongoose = require("mongoose");
var exh = require("express-handlebars");

var app = express();

var db = require("./modles");

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/articles";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("handlebars", exh({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./routing/cheerio.js")(app, db);
require("./routing/ApiRoutes.js")(app, db);
require("./routing/otherFiles.js")(app, path);

app.get("/saved/articles", (req, res) => {
    res.render("save");
})

var PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("listening!");
})