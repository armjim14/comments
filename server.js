var express = require("express");
var path = require("path");

var app = express();

require("./routing/routes.js")(app);
require("./routing/otherFiles.js")(app, path);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
})

var PORT = 3000 || process.env.PORT;

app.listen(PORT, () => {
    console.log("listening!");
})