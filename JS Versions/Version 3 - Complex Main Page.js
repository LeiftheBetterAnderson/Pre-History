//////////////
// Varibles //
//////////////

//some basic vars
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var WIDTH = 800;
var HEIGHT = 600;
canvas.width = WIDTH;
canvas.height = HEIGHT;

//mouse stuff
var mouseX;
var mouseY;
var mousePressed = false;
var pMouseX;
var pMouseY;
var cursorType = 'none';

//the page the game is playing on
var scene = "playScene";

//name of the game
var gameName = "Pre-History"

//sound stuff
var musicVol = 50;
var soundVol = 50;
var theme = 'none';
var audio = new Audio();
var sound = new Audio();

//for scrolling
var themeScrollY = 0;
var creditsScrollY = 0;

//images
var buttonImage = new Image();
buttonImage.src = "../Recources/Images/buttons.png";

var backgroundImage = new Image();
backgroundImage.src = "../Recources/Images/Background.png";

var settingsIcon = new Image();
settingsIcon.src = "../Recources/Images/settings.png";

var musicOnIcon = new Image();
musicOnIcon.src = "../Recources/Images/musicOn.png";

var musicOffIcon = new Image();
musicOffIcon.src = "../Recources/Images/musicOff.png";

var soundOnIcon = new Image();
soundOnIcon.src = "../Recources/Images/soundOn.png";

var soundOffIcon = new Image();
soundOffIcon.src = "../Recources/Images/soundOff.png";

var themesBackground = new Image();
themesBackground.src = "../Recources/Images/themesBackground.png";

var pointers = new Image();
pointers.src = "../Recources/Images/pointers.png";


/////////////////
// Dictionarys //
/////////////////

//all the possible theme songs to choose from
var themes = [
    ["Fanfare of Victory", "../Recources/Sounds/Fanfare of victory.ogg"],
    ["For the King", "../Recources/Sounds/For the king.ogg"],
    ["Heroic Demise", "../Recources/Sounds/Heroic Demise.ogg"],
    ["Kingdom of a Million Islands", "../Recources/Sounds/Kingdom of a million islands.ogg"],
    ["Kings Song", "../Recources/Sounds/Kings Song.ogg"],
    ["Medieval Times", "../Recources/Sounds/Medieval times.ogg"],
    ["Queens Song", "../Recources/Sounds/Queens Song.ogg"],
    ["Wars Victory", "../Recources/Sounds/Wars Victory.ogg"]
];

//all the credits entrys
var credits = [
    //Work, creater, website, size?
    ['Fruktur font', 'Viktoriya Grabowska', 'https://fonts.google.com/specimen/Fruktur'],
    ['Button click 1', 'NenadSimic', 'https://opengameart.org/content/menu-selection-click'],
    ['Button click 2 & 3', 'jalastram', 'https://opengameart.org/content/button-clicks-beeps-99-sounds', 13],
    ['Fanfare of Victory', 'pheonton', 'https://opengameart.org/content/maintheme'],
    ['For the King', 'Alexandr Zhelanov', 'https://opengameart.org/content/for-the-king'],
    ['Heroic Demise', 'Matthew Pablo', 'https://opengameart.org/content/heroic-demise-updated-version', 13],
    ['Kingdom of a Million Islands', 'Spring Spring', 'https://opengameart.org/content/kingdom-of-a-million-elephants-under-a-white-parasol', 9],
    ['Kings Song', 'professorlamp', 'https://opengameart.org/content/classicalmedieval-song'],
    ['Medieval Times', 'remaxim', 'https://opengameart.org/content/medieval'],
    ['Queens Song', 'HaelDB', 'https://opengameart.org/content/flare-main'],
    ['Wars Victory', 'cynicmusic', 'https://opengameart.org/content/battle-theme-b-for-rpg'],
    ['Red Framed Buttons', 'buttons', 'https://opengameart.org/content/buttons-and-frame'],
    ['Pointer Styles', 'yd', 'https://opengameart.org/content/pointers'],
    ['Settings/Sound Icons', 'trezegames', 'https://opengameart.org/content/gui-pack'],
    ['Themes Background', 'StumpyStrust', 'https://opengameart.org/content/fantasy-ui-box'],
    ['Wooded Background', 'jakegamer', 'https://opengameart.org/content/hd-multi-layer-parallex-background-samples-of-glitch-game-assets', 8],
    ['All other images used', 'Seven Kingdoms', 'https://opengameart.org/content/seven-kingdoms'],
    []// glich requires final entry unfilled
];

///////////////
// Functions //
///////////////

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
    ctx.font = size + 'px fruktur';
}
function strokeWidth(num) {
    ctx.lineWidth = num;
}
function rect(x, y, w, h) {
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
function circle(x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2*Math.PI);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
}

function isHovering(x, y, width, height) {
    if(mouseX>=x && mouseX<=x+width && mouseY>=y && mouseY<=y+height){
        return true;
    }
    else{
        return false;
    }
}

///////////////
// Game Loop //
///////////////

var audio = new Audio('../Recources/Sounds/theme.mp3');
audio.loop = true;
audio.play();

function update() {
    //update canvas position
    canvas.style.left = (window.innerWidth-WIDTH)/2+"px";
    canvas.style.top = (window.innerHeight-HEIGHT)/2+"px";

    //the scenes
    if (scene === "playScene") {
        ctx.drawImage(backgroundImage, 0, 0);
        //buttons
        if (isHovering(WIDTH/2-291/2, 200, 291, 64) === false) {
            ctx.drawImage(buttonImage, 0, 0, 291, 64, WIDTH/2-291/2, 200, 291, 64);
        }
        if (isHovering(WIDTH/2-291/2, 200, 291, 64) === true && mousePressed === false) {
            ctx.drawImage(buttonImage, 0, 64, 291, 64, WIDTH/2-291/2, 200, 291, 64);
        }
        if (isHovering(WIDTH/2-291/2, 200, 291, 64) === true && mousePressed === true) {
            ctx.drawImage(buttonImage, 0, 128, 291, 64, WIDTH/2-291/2, 200, 291, 64);

            sound.src = '../Recources/Sounds/button1.ogg';
            sound.play();
        }

        fill(0);
        textSize(30);
        text("Play", WIDTH/2, 242);

        if (isHovering(WIDTH/2-291/2, 325, 291, 64) === false) {
            ctx.drawImage(buttonImage, 0, 0, 291, 64, WIDTH/2-291/2, 325, 291, 64);
        }
        if (isHovering(WIDTH/2-291/2, 325, 291, 64) === true && mousePressed === false) {
            ctx.drawImage(buttonImage, 0, 64, 291, 64, WIDTH/2-291/2, 325, 291, 64);
        }
        if (isHovering(WIDTH/2-291/2, 325, 291, 64) === true && mousePressed === true) {
            ctx.drawImage(buttonImage, 0, 128, 291, 64, WIDTH/2-291/2, 325, 291, 64);
            scene = 'credits';

            sound.src = '../Recources/Sounds/button1.ogg';
            sound.play();
        }

        text("Credits", WIDTH/2, 367);

        ctx.drawImage(settingsIcon, 375, 520, 50, 50);

        if (isHovering(375, 520, 50, 50) === true && mousePressed === true) {
            scene = "settings";
                    
            sound.src = '../Recources/Sounds/button3.ogg';
            sound.play();
        }

        textSize(75);
        text(gameName, WIDTH/2, 100);
    }
    if (scene === "settings") {
        ctx.drawImage(backgroundImage, 0, 0);
        
        fill(0);
        textSize(75);
        text("Settings", WIDTH/2, 100);

        //sound sliders
        if (musicVol === 0) {
            ctx.drawImage(musicOffIcon, 50, 150, 50, 50);
        }
        if (musicVol > 0) {
            ctx.drawImage(musicOnIcon, 50, 150, 50, 50);
        }

        fill(100);
        noStroke();
        rect(123, 172, 274, 6);
        circle(123, 175, 3);
        circle(397, 175, 3);
        fill(240);
        stroke(150);
        circle(123+musicVol*2.74, 175, 10);

        if (mousePressed === true && isHovering(123, 170, 274, 10) === true) {
            musicVol+=((mouseX-pMouseX)/2.74);
        }
        if (musicVol<=0) {
            musicVol = 0;
        }
        if (musicVol>=100) {
            musicVol = 100;
        }

        if (soundVol === 0) {
            ctx.drawImage(soundOffIcon, 50, 250, 50, 50);
        }
        if (soundVol > 0) {
            ctx.drawImage(soundOnIcon, 50, 250, 50, 50);
        }

        fill(100);
        noStroke();
        rect(123, 272, 274, 6);
        circle(123, 275, 3);
        circle(397, 275, 3);
        fill(240);
        stroke(150);
        circle(123+soundVol*2.74, 275, 10);

        if (mousePressed === true && isHovering(123, 270, 274, 10) === true) {
            soundVol+=((mouseX-pMouseX)/2.74);
        }
        if (soundVol<=0) {
            soundVol = 0;
        }
        if (soundVol>=100) {
            soundVol = 100;
        }

        //button
        if (isHovering(WIDTH/4-291/2+25, 475, 291, 64) === false) {
            ctx.drawImage(buttonImage, 0, 0, 291, 64, WIDTH/4-291/2+25, 475, 291, 64);
        }
        if (isHovering(WIDTH/4-291/2+25, 475, 291, 64) === true && mousePressed === false) {
            ctx.drawImage(buttonImage, 0, 64, 291, 64, WIDTH/4-291/2+25, 475, 291, 64);
        }
        if (isHovering(WIDTH/4-291/2+25, 475, 291, 64) === true && mousePressed === true) {
            ctx.drawImage(buttonImage, 0, 128, 291, 64, WIDTH/4-291/2+25, 475, 291, 64);
            scene = "playScene";

            sound.src = '../Recources/Sounds/button1.ogg';
            sound.play();
        }

        fill(0);
        noStroke();
        textSize(30);
        text("Back", WIDTH/4+25, 517);

        //mouse selector
        textSize(40);
        text("Mouse Style", WIDTH/4+25, 360);

        for (var i = 0; i <= 4; i++) {
            if (i === 0) {
                ctx.drawImage(pointers, 0, 0, 28, 28, 80, 400, 28, 28);
                
                if (isHovering(80, 400, 28, 28) === true && mousePressed === true){
                    canvas.style.cursor = 'none';
                    cursorType = 'green';

                    sound.src = '../Recources/Sounds/button2.ogg';
                    sound.play();
                }
            }
            if (i === 1) {
                ctx.drawImage(pointers, 28, 0, 28, 28, 130, 400, 28, 28);
                
                if (isHovering(130, 400, 28, 28) === true && mousePressed === true){
                    canvas.style.cursor = 'none';
                    cursorType = 'red';
                    
                    sound.src = '../Recources/Sounds/button2.ogg';
                    sound.play();
                }
            }
            if (i === 2) {
                ctx.drawImage(pointers, 0, 28, 28, 28, 180, 400, 28, 28);

                if (isHovering(180, 400, 28, 28) === true && mousePressed === true){
                    canvas.style.cursor = 'none';
                    cursorType = 'yellow';
                    
                    sound.src = '../Recources/Sounds/button2.ogg';
                    sound.play();
                }
            }
            if (i === 3) {
                ctx.drawImage(pointers, 28, 28, 28, 28, 230, 400, 28, 28);

                if (isHovering(230, 400, 28, 28) === true && mousePressed === true){
                    canvas.style.cursor = 'none';
                    cursorType = 'blue';
                    
                    sound.src = '../Recources/Sounds/button2.ogg';
                    sound.play();
                }
            }
            if (i === 4) {
                textSize(31);
                text("None", 330, 425);

                if (isHovering(295, 400, 70, 28) === true && mousePressed === true){
                    canvas.style.cursor = 'default';
                    cursorType = 'none';
                    
                    sound.src = '../Recources/Sounds/button2.ogg';
                    sound.play();
                }
            }
        }

        //theme selector
        textSize(40);
        text("Theme Song", WIDTH*3/4, 200);

        ctx.drawImage(themesBackground, WIDTH/2+25, 210, WIDTH/2-50, WIDTH/2-50);

        textSize(20);
        
        for (var i = 0; i <= themes.length; i++) {
            if (270+i*40+themeScrollY >= 270 && 270+i*40+themeScrollY <= 510) {
                if (i < themes.length) {
                    if (isHovering(WIDTH/2+60, 270+i*40+themeScrollY-15, WIDTH/2-120, 20)) {
                        fill(50);

                        if (mousePressed === true && mouseX-pMouseX === 0 && mouseY-pMouseY === 0) {
                            theme = themes[i][1];
                            audio.src = theme;
                            audio.loop = true;
                            audio.play();
                        }
                    }
                    else {
                        fill(0);
                    }
                    text(themes[i][0], WIDTH*3/4, 270+i*40+themeScrollY);
                }
                else {
                    if (isHovering(WIDTH/2+60, 270+i*40+themeScrollY-15, WIDTH/2-120, 20)) {
                        fill(50);

                        if (mousePressed === true && mouseX-pMouseX === 0 && mouseY-pMouseY === 0) {
                            audio.src = theme;
                            theme = "none";
                        }
                    }
                    else {
                        fill(0);
                    }
                    text("None", WIDTH*3/4, 270+i*40+themeScrollY);
                }
            }
        }

        if (isHovering(WIDTH/2+25, 210, WIDTH/2-50, WIDTH/2-50) === true && mousePressed === true) {
            themeScrollY += mouseY - pMouseY;
            if (themeScrollY > 0) {
                themeScrollY = 0;
            }
            if (themeScrollY < -(themes.length*40)+240) {
                themeScrollY = -(themes.length*40)+240;
            }
        }
    }
    if (scene === "credits") {
        ctx.drawImage(backgroundImage, 0, 0);
        
        fill(0);
        textSize(75);
        text("Credits", WIDTH/2, 100);

        //labels
        textSize(30);
        text("Work", WIDTH/6, 180);
        text("Owner", WIDTH/3, 180);
        text("Website", WIDTH*3/4-10, 180);

        //entrys
        textSize(15);

        for (var i = 0; i < credits.length; i++) {
            if (i*30+creditsScrollY >= 0 && i*30+creditsScrollY <= 240) {
                if (credits[i].length === 4) {
                    textSize(credits[i][3]);
                }

                text(credits[i][0], WIDTH/6, 215+i*30+creditsScrollY);
                text(credits[i][1], WIDTH/3, 215+i*30+creditsScrollY);
                text(credits[i][2], WIDTH*3/4-10, 215+i*30+creditsScrollY);

                if (credits[i].length === 4) {
                    textSize(15);
                }
            }
        }

        //entry scrolling
        if (isHovering(0, 210, WIDTH, 240) === true && mousePressed === true) {
            creditsScrollY += mouseY-pMouseY;
            if (creditsScrollY > 0) {
                creditsScrollY = 0;
            }
            if (creditsScrollY < -(credits.length*30)+300) {
                creditsScrollY = -(credits.length*30)+300;
            }
        }

        //button
        if (isHovering(WIDTH/2-291/2, 475, 291, 64) === false) {
            ctx.drawImage(buttonImage, 0, 0, 291, 64, WIDTH/2-291/2, 475, 291, 64);
        }
        if (isHovering(WIDTH/2-291/2, 475, 291, 64) === true && mousePressed === false) {
            ctx.drawImage(buttonImage, 0, 64, 291, 64, WIDTH/2-291/2, 475, 291, 64);
        }
        if (isHovering(WIDTH/2-291/2, 475, 291, 64) === true && mousePressed === true) {
            ctx.drawImage(buttonImage, 0, 128, 291, 64, WIDTH/2-291/2, 475, 291, 64);
            scene = "playScene";

            sound.src = '../Recources/Sounds/button1.ogg';
            sound.play();
        }

        fill(0);
        noStroke();
        textSize(30);
        text("Back", WIDTH/2, 517);
    }

    //mouse design 
    if (cursorType === 'green') {
        ctx.drawImage(pointers, 0, 0, 28, 28, mouseX, mouseY-3, 28, 28);
    }
    if (cursorType === 'red') {
        ctx.drawImage(pointers, 28, 0, 28, 28, mouseX, mouseY-3, 28, 28);
    }
    if (cursorType === 'yellow') {
        ctx.drawImage(pointers, 0, 28, 28, 28, mouseX, mouseY-3, 28, 28);
    }
    if (cursorType === 'blue') {
        ctx.drawImage(pointers, 28, 28, 28, 28, mouseX, mouseY-3, 28, 28);
    }

    //change volumes
    audio.volume = musicVol/100;
    sound.volume = soundVol/100;

    requestAnimationFrame(update);
    pMouseX = mouseX;
    pMouseY = mouseY;
}

update();

////////////
// Events //
////////////

document.addEventListener('mousemove', function(e) {
    mouseX = Math.round(e.clientX-(window.innerWidth-WIDTH)/2);
    mouseY = Math.round(e.clientY-(window.innerHeight-HEIGHT)/2);
});

document.addEventListener('mousedown', function() {
    mousePressed = true;
});

document.addEventListener('mouseup', function() {
    mousePressed = false;
});