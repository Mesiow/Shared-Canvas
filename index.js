const express = require("express");
const app = express();
const server = require('http').createServer(app);
const io = require("socket.io")(server);

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/client'));

app.get("/", (req, res) => {
    res.render("main");
});

server.listen(process.env.PORT || 4000, () => {
    console.log("Server listening...");
});


var connectedUsers = [];
var maxPeers = 2;

//socket.io 
io.on("connection", (socket) => {
    console.log("a user connected");
    console.log(socket.id)
    console.log("Connected users: ", connectedUsers.length);
    if(connectedUsers.length < maxPeers){
        connectedUsers.push(socket.id);

        socket.on("join", (data) => {
            console.log(data);
        });
    }else{
        //Tell new client who is trying to join, that it's full
        io.to(socket.id).emit("Server Full");
    }
});


