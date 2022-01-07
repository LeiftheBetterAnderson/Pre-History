//////////////
// Varibles //
//////////////

//some basic vars
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

//the page the game is playing on
var scene = "playScene";

///////////////////
// 2d primitives //
///////////////////

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

///////////////
// Game Loop //
///////////////

function update() {
    //button visibility
    if (scene === "playScene") {
        document.getElementById("playSceneButtonsPlay").style.display = "inline"
        document.getElementById("playSceneButtonsCredits").style.display = "inline";
    }
    if (scene !== "playScene") {
        document.getElementById("playSceneButtonsPlay").style.display = "none";
        document.getElementById("playSceneButtonsCredits").style.display = "none";
    }

    //update basic vars
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;
    canvas.style.width = WIDTH+"px";
    canvas.style.height = HEIGHT+"px";
    
    //the initial scene
    if (scene === "playScene") {
        fill(100);
        noStroke();
        rect(0, 0, WIDTH, HEIGHT);
    }
}

function gameLoop() {
    requestAnimationFrame(gameLoop);
    update();
}

gameLoop();

////////////
// Events //
////////////

//button events
document.getElementById("playSceneButtonsPlay").addEventListener("click", function(){
    if (scene === "playScene") {
        scene = "town";
    }
});
document.getElementById("playSceneButtonsPlay").addEventListener("mouseenter", function(){
    if (scene === "playScene") {
        document.getElementById("playSceneButtonsPlay").style.border = "4px solid yellow";
    }
});
document.getElementById("playSceneButtonsPlay").addEventListener("mouseleave", function(){
    if (scene === "playScene") {
        document.getElementById("playSceneButtonsPlay").style.border = "0px";
    }
});
document.getElementById("playSceneButtonsCredits").addEventListener("click", function(){
    if (scene === "playScene") {
        scene = "credits";
    }
});
document.getElementById("playSceneButtonsCredits").addEventListener("mouseenter", function(){
    if (scene === "playScene") {
        document.getElementById("playSceneButtonsCredits").style.border = "4px solid yellow";
    }
});
document.getElementById("playSceneButtonsCredits").addEventListener("mouseleave", function(){
    if (scene === "playScene") {
        document.getElementById("playSceneButtonsCredits").style.border = "0px";
    }
});