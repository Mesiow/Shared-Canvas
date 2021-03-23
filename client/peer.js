
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
    fill(data.color, data.x, data.y);
});

socket.on("PeerDataLine", (data) => {
    drawFrom(data.color, data.px, data.py, data.x, data.y);
});

function sendPeerDataPoint(color, posX, posY){
    socket.emit("PeerDataPoint", {color: color, x: posX, y: posY});
}

function sendPeerDataLine(lineColor, prevX, prevY, currX, currY){
    socket.emit("PeerDataLine", 
    {   color: lineColor,
        prevx: prevX, prevy: prevY,
        currx: currX, curry: currY
    });
}
