const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/client'));

app.get("/", (req, res) => {
    res.render("main");
});

app.listen(process.env.PORT || 4000, () => {
    console.log("Server listening...");
});
