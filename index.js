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

//////////////////////////////////
var connectedUsers = [];
var maxPeers = 2;

const setupClientEvents = (socket) => {
     //On Client join event
     socket.on("join", (data) => {
        console.log(data);
    });
    //On client disconnect event
    socket.on("disconnect", () => {
        let i = connectedUsers.indexOf(socket.id);
        connectedUsers.splice(i, 1);
        console.log("removed user ", i);
        console.log("Users size: ", connectedUsers.length);
    });
};

//socket.io 
io.on("connection", (socket) => {
    if(connectedUsers.length < maxPeers){
        connectedUsers.push(socket.id);
        setupClientEvents(socket);
    }else{
        //Tell new client who is trying to join, that it's full
        io.to(socket.id).emit("Server Full");
    }

    console.log("Connected users: ", connectedUsers.length);
});


