
var socket = io();

socket.on("connect", () => {
    console.log(socket.connected);
    console.log(socket.id);
    socket.emit("join", "Hello world from client");
});

socket.on("Server Full", () => {
    console.log("Server is full, connection denied");
});