//some basic vars
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

//2d primitives
function fill(r, g, b, a) {
    if (g === undefined) {
        g = r;
        b = r;
    }
    if (a === undefined) {
        a = 255;
    }
    ctx.fillStyle = "rgb(" + r + ", " + g + ", " + b + ", " + a + ")";
}
function stroke(r, g, b) {
    if (g === undefined) {
        g = r;
        b = r;
    }
    ctx.strokeStyle = "rgb(" + r + ", " + g + ", " + b +")";
}
function noStroke() {
    ctx.strokeStyle = "rgb(0, 0, 0, 0)";
}
function textSize(size) {
    ctx.font = size + 'px American Typewriter';
}
function strokeWidth(num) {
    ctx.lineWidth = num;
}
function rect(x, y, w, h){
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
}
function text(text, x, y) {
    ctx.textAlign = "center";
    ctx.fillText(text, x, y);
    ctx.strokeText(text, x, y);
}

function update() {
    //update basic vars
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;
    canvas.style.width = WIDTH+"px";
    canvas.style.height = HEIGHT+"px";

    //background
    fill();
    rect(0, 0, WIDTH, HEIGHT);

    //call this function again
    requestAnimationFrame(update);
}

update();