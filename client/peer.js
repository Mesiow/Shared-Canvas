
var socket = io();

socket.on("connect", () => {
    console.log(socket.connected);
    console.log(socket.id);
    socket.emit("join", "Hello world from client");
});

socket.on("Server Full", () => {
    console.log("Server is full, connection denied");
});

//Receive peer data
socket.on("PeerDataPoint", (data) => {
    fill(data.x, data.y);
});

socket.on("PeerDataLine", (data) => {
    drawFrom(data.px, data.py, data.x, data.y);
});

function sendPeerDataPoint(posX, posY){
    socket.emit("PeerDataPoint", {x: posX, y: posY});
}

function sendPeerDataLine(prevX, prevY, currX, currY){
    socket.emit("PeerDataLine", 
    {prevx: prevX, prevy: prevY, currx: currX, curry: currY});
}
