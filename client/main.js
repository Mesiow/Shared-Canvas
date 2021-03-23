/*import Cursor from 'custom-cursor'

new Cursor({}).mount();

const customCursor = new Cursor({
    secondCursor: true, // default = false
    hoverTargets: ['.link-button', '#hero-text', 'p'], // default = null
    browserCursor: false, // default = true
});
*/

var canvas;
var canvasRect;
var ctx;
var width, height;
var penColor = "black";

var prevX = 0;
var prevY = 0;
var currX = 0;
var currY = 0;

var flag = false;
var dotflag = false;


function init(){
    canvas = $("#canvas");
    ctx = canvas[0].getContext('2d');
    
    width = canvas.width();
    height = canvas.height();
    canvasRect = canvas[0].getBoundingClientRect();

    canvas.on("mousemove", function(e){
        findxy('move', e);
    });

    canvas.on("mousedown", function(e){
        findxy('down', e);
    });

    canvas.on('mouseup', function(e){
        findxy('up', e);
    });

    canvas.on('mouseout', function(e){
        findxy('out', e);
    })
}

function getMousePosition(e){
    let mx = e.offsetX * canvas.width() / canvas.innerWidth() | 0;
    let my = e.offsetY * canvas.height() / canvas.innerHeight() | 0;
    return {x: mx, y: my};
}

function draw(){
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.strokeStyle = penColor;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
}

//Draw line function for network use
function drawFrom(color, px, py, x, y){
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.lineTo(x, y);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
}

function findxy(res, e){
    if(res == 'down'){
        prevX = currX;
        prevY = currY;
        currX = getMousePosition(e).x;
        currY = getMousePosition(e).y;

        flag = true;
        dotflag = true;
        if(dotflag){
            ctx.beginPath();
            ctx.fillStyle = penColor;
            ctx.fillRect(currX, currY, 1, 1);
            ctx.closePath();
            dotflag = false;

            //send peer data to server
            sendPeerDataPoint(penColor, currX, currY);
        }
    }
    if(res == 'up' || res == 'out'){
        flag = false;
    }
    if(res == 'move'){
        if(flag){
            prevX = currX;
            prevY = currY;
            currX = getMousePosition(e).x;
            currY = getMousePosition(e).y;
            draw();

            sendPeerDataLine(penColor, prevX, prevY, currX, currY);
        }
    }
}

//fill a rect at a position received from the network
function fill(color, posX, posY){
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(posX, posY, 1, 1);
    ctx.closePath();
}

$(document).ready(function(){
    init();
    $("#colr").change(function(){
       penColor = $(this).val();
    });
});