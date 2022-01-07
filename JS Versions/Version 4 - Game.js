///////////
// NOISE //
///////////

var chunksBones = [];
var chunk = [];
var chunks = [];
var v = 0;

function noiseCreate(widthChunks, heightChunks) {
    for(var i = 0; i < heightChunks*2; i++) {
        chunksBones[i] = [];
    }
    for(var x = 0; x < widthChunks*2; x++) {
        for(var y = 0; y < heightChunks*2; y++) {
            if ((y == 0 && x % 2 != 0) || (x === 0 && y % 2 != 0) || (x === 0 && y === 0) || (x % 2 != 0 && y % 2 != 0)) {
                v = Math.floor(Math.random()*4);
            }
            else {
                if (y % 2 != 0 || y === 0) {
                    v = chunksBones[y][x-1];
                }
                else {
                    v = chunksBones[y-1][x];
                }
            }

            chunksBones[y][x] = v;
        }
    }
    for(var i = 0; i < heightChunks*10; i++) {
        chunks[i] = [];
    }
    for(var x = 0; x < widthChunks; x++) {
        for(var y = 0; y < heightChunks; y++) {
            for(var i = 0; i < 10; i++) {
                chunk[i] = [];
            }

            chunk[0][0] = chunksBones[y*2][x*2];
            chunk[0][9] = chunksBones[y*2][x*2+1];
            chunk[9][0] = chunksBones[y*2+1][x*2];
            chunk[9][9] = chunksBones[y*2+1][x*2+1];

            for(var i = 1; i <= 8; i++) {
                chunk[i][0] = (chunk[0][0]*(8-i) + chunk[9][0]*(i)) / 8;
                chunk[i][9] = (chunk[0][9]*(8-i) + chunk[9][9]*(i)) / 8;
            }
            for (var i = 0; i < 10; i++) {
                for(var v = 1; v <= 8; v++) {
                    chunk[i][v] = (chunk[i][0]*(8-v) + chunk[i][9]*(v)) / 8;
                }
            }
            for (var i = 0; i < 10; i++) {
                for(var v = 0; v < 10; v++) {
                    chunk[i][v] = Math.round(chunk[i][v]);
                }
            }
            for(var i = 0; i < 10; i++) {
                for(var v = 0; v < 10; v++) {
                    chunks[y*10+i][x*10+v] = chunk[i][v];
                }
            }
        }
    }
    for(var x = 1; x < widthChunks*10-2; x++) {
        for(var y = 1; y < heightChunks*10-2; y++) {
            var currentBlock = chunks[y][x];

            if (chunks[y+1][x-1] === currentBlock 
                && chunks[y][x-1] === currentBlock
                && chunks[y-1][x-1] === currentBlock-1
                && chunks[y-1][x] === currentBlock
                && chunks[y-1][x+1] === currentBlock
                && chunks[y][x+1] === currentBlock
                && chunks[y+1][x+1] === currentBlock-1
                && chunks[y+1][x] === currentBlock ) {
                    chunks[y][x] = currentBlock-1;
            }
            else if (chunks[y+1][x-1] === currentBlock-1
                && chunks[y][x-1] === currentBlock
                && chunks[y-1][x-1] === currentBlock
                && chunks[y-1][x] === currentBlock
                && chunks[y-1][x+1] === currentBlock-1
                && chunks[y][x+1] === currentBlock
                && chunks[y+1][x+1] === currentBlock
                && chunks[y+1][x] === currentBlock ) {
                    chunks[y][x] = currentBlock-1;
            }
        }
    }
}

function noiseGet(x, y) {
    return chunks[y][x];
}

//////////////
// Varibles //
//////////////

/*
Worlds Data Credits:
  0 - Game Facts
    0 - Game Name
    1 - Game Difficulty
  1 - Game Raw Data
    0 - World Blocks
      (x and y axies)
*/

//some canvas stats
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var CANVAS = document.getElementById('unTintedCanvas');
var CTX = CANVAS.getContext("2d");
CANVAS.width = 250;
CANVAS.height = 250;
CANVAS.style.visibility = 'hidden';

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

//world data stuff
var worldsData = JSON.parse(localStorage.getItem('worldsData'));
var worlds = worldsData;
var devWorld = [[[]]];
var worldPlaying;
var discoveredChunks = [];

if (worlds === null) {
    worlds = [];
}

//the page the game is playing on
var scene = "playScene";
var oldScene = "playScene";

//name of the game
var gameName = "Pre-History"

//deleteing worlds
var deleteWorldElement;

//world varibles
worldHeight = 250; //must be multiple of 10
worldWidth = 250; //must be multupile of 10

var worldScrollX = -(800/2);
var worldScrollY = -(HEIGHT/2-worldHeight*16);

//sound stuff
var musicVol = 50;
var soundVol = 50;
var theme = 'none';
var audio = new Audio();
var sound = new Audio();

//for scrolling
var themeScrollY = 0;
var creditsScrollY = 0;
var worldsScrollY = 0;

//frame
var frame = 0;

//loading stuff
var landscapeImage;

//player
var playerPosX;
var playerPosY;

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

var homeIcon = new Image();
homeIcon.src = "../Recources/Images/home.png";

var themesBackground = new Image();
themesBackground.src = "../Recources/Images/themesBackground.png";

var pointers = new Image();
pointers.src = "../Recources/Images/pointers.png";

var trashIcon = new Image();
trashIcon.src = "../Recources/Images/trash.png";

var worldBackground = new Image();
worldBackground.src = "../Recources/Images/worldBackground.png";

var playingGui = new Image();
playingGui.src = "../Recources/Images/playingGui.png"

var paperGui = new Image();
paperGui.src = "../Recources/Images/paper background.png"


//tile images
var grass = new Image();
grass.src = "../Recources/Graphics/tiles/grass/0.png";

var beach = new Image();
beach.src = "../Recources/Graphics/tiles/beach/0.png";

var shallow = new Image();
shallow.src = "../Recources/Graphics/tiles/shallow/0.png";

var deep = new Image();
deep.src = "../Recources/Graphics/tiles/deep/0.png";

var grassBeachStraight45 = new Image();
grassBeachStraight45.src = "../Recources/Graphics/tiles/grass-beach/straight/45/0.png";

var grassBeachStraight135 = new Image();
grassBeachStraight135.src = "../Recources/Graphics/tiles/grass-beach/straight/135/0.png";

var grassBeachStraight225 = new Image();
grassBeachStraight225.src = "../Recources/Graphics/tiles/grass-beach/straight/225/0.png";

var grassBeachStraight315 = new Image();
grassBeachStraight315.src = "../Recources/Graphics/tiles/grass-beach/straight/315/0.png";

var grassBeachCurve_In45 = new Image();
grassBeachCurve_In45.src = "../Recources/Graphics/tiles/grass-beach/curve_in/45/0.png";

var grassBeachCurve_In135 = new Image();
grassBeachCurve_In135.src = "../Recources/Graphics/tiles/grass-beach/curve_in/135/0.png";

var grassBeachCurve_In225 = new Image();
grassBeachCurve_In225.src = "../Recources/Graphics/tiles/grass-beach/curve_in/225/0.png";

var grassBeachCurve_In315 = new Image();
grassBeachCurve_In315.src = "../Recources/Graphics/tiles/grass-beach/curve_in/315/0.png";

var grassBeachCurve_Out45 = new Image();
grassBeachCurve_Out45.src = "../Recources/Graphics/tiles/grass-beach/curve_out/45/0.png";

var grassBeachCurve_Out135 = new Image();
grassBeachCurve_Out135.src = "../Recources/Graphics/tiles/grass-beach/curve_out/135/0.png";

var grassBeachCurve_Out225 = new Image();
grassBeachCurve_Out225.src = "../Recources/Graphics/tiles/grass-beach/curve_out/225/0.png";

var grassBeachCurve_Out315 = new Image();
grassBeachCurve_Out315.src = "../Recources/Graphics/tiles/grass-beach/curve_out/315/0.png";

var beachShallowStraight45 = new Image();
beachShallowStraight45.src = "../Recources/Graphics/tiles/beach-shallow/straight/45/0.png";

var beachShallowStraight135 = new Image();
beachShallowStraight135.src = "../Recources/Graphics/tiles/beach-shallow/straight/135/0.png";

var beachShallowStraight225 = new Image();
beachShallowStraight225.src = "../Recources/Graphics/tiles/beach-shallow/straight/225/0.png";

var beachShallowStraight315 = new Image();
beachShallowStraight315.src = "../Recources/Graphics/tiles/beach-shallow/straight/315/0.png";

var beachShallowCurve_In45 = new Image();
beachShallowCurve_In45.src = "../Recources/Graphics/tiles/beach-shallow/curve_in/45/0.png";

var beachShallowCurve_In135 = new Image();
beachShallowCurve_In135.src = "../Recources/Graphics/tiles/beach-shallow/curve_in/135/0.png";

var beachShallowCurve_In225 = new Image();
beachShallowCurve_In225.src = "../Recources/Graphics/tiles/beach-shallow/curve_in/225/0.png";

var beachShallowCurve_In315 = new Image();
beachShallowCurve_In315.src = "../Recources/Graphics/tiles/beach-shallow/curve_in/315/0.png";

var beachShallowCurve_Out45 = new Image();
beachShallowCurve_Out45.src = "../Recources/Graphics/tiles/beach-shallow/curve_out/45/0.png";

var beachShallowCurve_Out135 = new Image();
beachShallowCurve_Out135.src = "../Recources/Graphics/tiles/beach-shallow/curve_out/135/0.png";

var beachShallowCurve_Out225 = new Image();
beachShallowCurve_Out225.src = "../Recources/Graphics/tiles/beach-shallow/curve_out/225/0.png";

var beachShallowCurve_Out315 = new Image();
beachShallowCurve_Out315.src = "../Recources/Graphics/tiles/beach-shallow/curve_out/315/0.png";

var shallowDeepStraight45 = new Image();
shallowDeepStraight45.src = "../Recources/Graphics/tiles/shallow-deep/straight/45/0.png";

var shallowDeepStraight135 = new Image();
shallowDeepStraight135.src = "../Recources/Graphics/tiles/shallow-deep/straight/135/0.png";

var shallowDeepStraight225 = new Image();
shallowDeepStraight225.src = "../Recources/Graphics/tiles/shallow-deep/straight/225/0.png";

var shallowDeepStraight315 = new Image();
shallowDeepStraight315.src = "../Recources/Graphics/tiles/shallow-deep/straight/315/0.png";

var shallowDeepCurve_In45 = new Image();
shallowDeepCurve_In45.src = "../Recources/Graphics/tiles/shallow-deep/curve_in/45/0.png";

var shallowDeepCurve_In135 = new Image();
shallowDeepCurve_In135.src = "../Recources/Graphics/tiles/shallow-deep/curve_in/135/0.png";

var shallowDeepCurve_In225 = new Image();
shallowDeepCurve_In225.src = "../Recources/Graphics/tiles/shallow-deep/curve_in/225/0.png";

var shallowDeepCurve_In315 = new Image();
shallowDeepCurve_In315.src = "../Recources/Graphics/tiles/shallow-deep/curve_in/315/0.png";

var shallowDeepCurve_Out45 = new Image();
shallowDeepCurve_Out45.src = "../Recources/Graphics/tiles/shallow-deep/curve_out/45/0.png";

var shallowDeepCurve_Out135 = new Image();
shallowDeepCurve_Out135.src = "../Recources/Graphics/tiles/shallow-deep/curve_out/135/0.png";

var shallowDeepCurve_Out225 = new Image();
shallowDeepCurve_Out225.src = "../Recources/Graphics/tiles/shallow-deep/curve_out/225/0.png";

var shallowDeepCurve_Out315 = new Image();
shallowDeepCurve_Out315.src = "../Recources/Graphics/tiles/shallow-deep/curve_out/315/0.png";

//elements
var worldName = document.getElementById('worldName');
worldName.style.display = "none";

var difficulties = document.getElementById('difficultyOptions');
difficulties.style.display = "none";

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
    ['Settings/Sound/Home Icons', 'trezegames', 'https://opengameart.org/content/gui-pack', 13],
    ['Themes Background', 'StumpyStrust', 'https://opengameart.org/content/fantasy-ui-box'],
    ['Wooded Background', 'jakegamer', 'https://opengameart.org/content/hd-multi-layer-parallex-background-samples-of-glitch-game-assets', 8],
    ['Trash Icon', 'Anatoly753', 'https://opengameart.org/content/ui-black-button-delete'],
    ['World Background', 'pennomi', 'https://opengameart.org/content/lpc-pennomis-ui-elements'],
    ['Delete Sound Effect', 'p0ss', 'https://opengameart.org/content/interface-sounds-starter-pack', 14],
    ['Game menu GUI', 'Lamoot', 'https://opengameart.org/content/rpg-gui-construction-kit-v10'],
    ['Landscape Tiles', 'Unknown Horisions', 'https://opengameart.org/content/unknown-horizons-tileset', 13],
    ['All other images used', 'Seven Kingdoms', 'https://opengameart.org/content/seven-kingdoms', 14],
    []// glich requires final entry unfilled
];

//////////////
// ENTITIES //
//////////////

//scouts
//x, y, frame, frameTicks, direction, xoff, yoff
var scouts = [[worldWidth/2, worldHeight/2, 0, 0, 2, 0, 0]];
var scoutFrames = [
    ['0000.png', '0001.png', '0002.png', '0003.png', '0004.png'], //forward
    ['0005.png', '0006.png', '0007.png', '0008.png', '0009.png'], //forward-right
    ['0010.png', '0011.png', '0012.png', '0013.png', '0014.png'], //right
    ['0015.png', '0016.png', '0017.png', '0018.png', '0019.png'], //right-backwards
    ['0020.png', '0021.png', '0022.png', '0023.png', '0024.png'], //backwards
    ['0025.png', '0026.png', '0027.png', '0028.png', '0029.png'], //forwards-left
    ['0030.png', '0031.png', '0032.png', '0033.png', '0034.png'], //left
    ['0035.png', '0036.png', '0037.png', '0038.png', '0039.png'], //left-backwards
    ['0040.png', '0041.png', '0042.png', '0043.png', '0044.png']  //dieing
];

function runEntityAi() {
    for (var i = 0; i < scouts.length; i++) {
        var getX = scouts[i][0];
        var getY = scouts[i][1];

        var posX = (getX/2-getY/2)*64-worldScrollX;
        var posY = (getY/2+getX/2)*32-worldScrollY;

        if (scouts[i][4] === 0) {
            scouts[i][6]+=Math.sqrt(2);
            scouts[i][5]+=Math.sqrt(2);
        }
        else if (scouts[i][4] === 1) {
            scouts[i][5]+=2;
        }
        else if (scouts[i][4] === 2) {
            scouts[i][6]-=Math.sqrt(2);
            scouts[i][5]+=Math.sqrt(2);
        }
        else if (scouts[i][4] === 3) {
            scouts[i][6]-=2;
        }
        else if (scouts[i][4] === 4) {
            scouts[i][6]+=Math.sqrt(2);
            scouts[i][5]-=Math.sqrt(2);
        }
        else if (scouts[i][4] === 5) {
            scouts[i][5]-=2;
        }
        else if (scouts[i][4] === 6) {
            scouts[i][6]-=Math.sqrt(2);
            scouts[i][5]-=Math.sqrt(2);
        }
        else if (scouts[i][4] === 7) {
            scouts[i][6]+=2;
        }
        if (scouts[i][5] >= 32) {
            scouts[i][5] = 0;
            scouts[i][0]++;
        }
        else if (scouts[i][5] <= -64) {
            scouts[i][5] = 0;
            scouts[i][0]--;
        }
        if (scouts[i][6] >= 32) {
            scouts[i][6] = 0;
            scouts[i][1]++;
        }
        else if (scouts[i][6] <= -32) {
            scouts[i][6] = 0;
            scouts[i][1]--;
        }

        if (posX+scouts[i][5]/2-scouts[i][6]/2 > -100 && posX+scouts[i][5]/2-scouts[i][6]/2 < 800 && posY+scouts[i][5]/2+scouts[i][6]/2 > -100 && posY+scouts[i][5]/2+scouts[i][6]/2 < HEIGHT) {
            scouts[i][3]++;

            if (scouts[i][3] === 10) {
                scouts[i][3] = 0;

                scouts[i][2]++;

                if (scouts[i][2] > 4) {
                    scouts[i][2] = 0;
                }
            }

            ctx.drawImage(scoutFrames[scouts[i][4]][scouts[i][2]], posX+scouts[i][5]/2-scouts[i][6]/2,  posY+scouts[i][5]/2+scouts[i][6]/2);
        }
    }
}

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
    ctx.textAlign = "center";
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
            scene = 'gameSelect';
            mousePressed = false;

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
            mousePressed = false;

            sound.src = '../Recources/Sounds/button1.ogg';
            sound.play();
        }

        text("Credits", WIDTH/2, 367);

        ctx.drawImage(settingsIcon, 375, 520, 50, 50);

        if (isHovering(375, 520, 50, 50) === true && mousePressed === true) {
            scene = "settings";
            oldScene = 'playScene';
            mousePressed = false;
                    
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
            scene = oldScene;
            mousePressed = false;

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
                    mousePressed = false;

                    sound.src = '../Recources/Sounds/button2.ogg';
                    sound.play();
                }
            }
            if (i === 1) {
                ctx.drawImage(pointers, 28, 0, 28, 28, 130, 400, 28, 28);
                
                if (isHovering(130, 400, 28, 28) === true && mousePressed === true){
                    canvas.style.cursor = 'none';
                    cursorType = 'red';
                    mousePressed = false;
                    
                    sound.src = '../Recources/Sounds/button2.ogg';
                    sound.play();
                }
            }
            if (i === 2) {
                ctx.drawImage(pointers, 0, 28, 28, 28, 180, 400, 28, 28);

                if (isHovering(180, 400, 28, 28) === true && mousePressed === true){
                    canvas.style.cursor = 'none';
                    cursorType = 'yellow';
                    mousePressed = false;
                    
                    sound.src = '../Recources/Sounds/button2.ogg';
                    sound.play();
                }
            }
            if (i === 3) {
                ctx.drawImage(pointers, 28, 28, 28, 28, 230, 400, 28, 28);

                if (isHovering(230, 400, 28, 28) === true && mousePressed === true){
                    canvas.style.cursor = 'none';
                    cursorType = 'blue';
                    mousePressed = false;
                    
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
                    mousePressed = false;
                    
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

        //settings button
        ctx.drawImage(settingsIcon, 90, 20, 50, 50);

        if (isHovering(90, 20, 50, 50) === true && mousePressed === true) {
            scene = "settings";
            oldScene = 'credits';
            mousePressed = false;
                    
            sound.src = '../Recources/Sounds/button3.ogg';
            sound.play();
        }

        //labels
        textSize(30);
        text("Work", WIDTH/6, 180);
        text("Owner", WIDTH/3, 180);
        text("Website", WIDTH*3/4-10, 180);

        //entrys
        ctx.font = '15px Arial';
        

        for (var i = 0; i < credits.length; i++) {
            if (i*30+creditsScrollY >= 0 && i*30+creditsScrollY <= 240) {
                if (credits[i].length === 4) {
                    ctx.font = credits[i][3]+'px Arial';
                }

                text(credits[i][0], WIDTH/6, 215+i*30+creditsScrollY);
                text(credits[i][1], WIDTH/3, 215+i*30+creditsScrollY);
                text(credits[i][2], WIDTH*3/4-10, 215+i*30+creditsScrollY);

                if (credits[i].length === 4) {
                    ctx.font = '15px Arial';
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
            mousePressed = false;

            sound.src = '../Recources/Sounds/button1.ogg';
            sound.play();
        }

        fill(0);
        noStroke();
        textSize(30);
        text("Back", WIDTH/2, 517);
    }
    if (scene !== "playScene" && scene !== "settings" && scene !== "credits") {
        runGame();
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

function runGame() {
    if (scene === "gameSelect") {
        ctx.drawImage(backgroundImage, 0, 0);
        
        fill(0);
        textSize(75);
        text("Select World", WIDTH/2, 100);

        //settings button
        ctx.drawImage(settingsIcon, 90, 20, 50, 50);

        if (isHovering(90, 20, 50, 50) === true && mousePressed === true) {
            scene = "settings";
            oldScene = 'gameSelect';
            mousePressed = false;
                    
            sound.src = '../Recources/Sounds/button3.ogg';
            sound.play();
        }

        //home button
        ctx.drawImage(homeIcon, WIDTH-140, 20, 50, 50);

        if (isHovering(WIDTH-140, 20, 50, 50) === true && mousePressed === true) {
            scene = "playScene";
            mousePressed = false;
                    
            sound.src = '../Recources/Sounds/button3.ogg';
            sound.play();
        }

        //worlds select
        for (var i = 0; i <= worlds.length; i++) {
            if (i === 0) {
                if (i*100+worldsScrollY >= 0 && i*100+worldsScrollY <= 440) {
                    ctx.drawImage(worldBackground, 200, i*100+worldsScrollY+150);

                    noStroke();
                    fill(0);
                    ctx.font = '100px American Typewriter Condensed Bold';
                    text("+", 310, i*100+worldsScrollY+150+68);

                    textSize(30);
                    ctx.textAlign = 'left';
                    text("New World", 360, i*100+worldsScrollY+150+55);

                    if (isHovering(200, i*100+worldsScrollY+150, WIDTH/2, 90) === true && mousePressed === true) {
                        scene = "newWorld";
                        mousePressed = false;
                
                        sound.src = '../Recources/Sounds/button2.ogg';
                        sound.play();
                    }
                }
            }
            else {
                if (i*100+worldsScrollY >= 0 && i*100+worldsScrollY <= 300) {
                    ctx.drawImage(worldBackground, 200, i*100+worldsScrollY+150);

                    noStroke();
                    fill(0);
                    textSize(30);
                    ctx.textAlign = 'left';
                    text(worlds[i-1][0][0], 225, i*100+worldsScrollY+150+38);

                    textSize(18);
                    ctx.textAlign = 'left';
                    text(worlds[i-1][0][1], 225, i*100+worldsScrollY+150+68);

                    ctx.drawImage(trashIcon, 610, i*100+worldsScrollY+165);

                    if(mousePressed === true && isHovering(610, i*100+worldsScrollY+165, 60, 60)===true){
                        scene = 'areYouSure';
                        mousePressed = false;

                        sound.src = '../Recources/Sounds/button1.ogg';
                        sound.play();

                        deleteWorldElement = i-1;
                    }
                    if (isHovering(200, i*100+worldsScrollY+150, WIDTH/2, 90) === true && mousePressed === true) {
                        scene = "loading";
                        frame = 0;
                        worldPlaying = i-1;
                        mousePressed = false;
                
                        sound.src = '../Recources/Sounds/button2.ogg';
                        sound.play();
                    }
                }
            }
        }

        noStroke();

        //entry scrolling
        if (isHovering(200, 150, HEIGHT, 450) === true && mousePressed === true) {
            worldsScrollY += mouseY-pMouseY;

            if (worldsScrollY > 0) {
                worldsScrollY = 0;
            }
            if (worlds.length > 3) {
                if (worldsScrollY < -(worlds.length*100)+300) {
                    worldsScrollY = -(worlds.length*100)+300;
                }
            }
            else {
                worldsScrollY = 0;
            }
        }
    }
    if (scene === "newWorld") {
        ctx.drawImage(backgroundImage, 0, 0);
        
        fill(0);
        textSize(75);
        text("New World", WIDTH/2, 100);

        //name
        textSize(20);
        text('World Name:', 400, 150);

        worldName.style.display = "initial";
        worldName.style.top = ((window.innerHeight-HEIGHT)/2+170) + 'px';
        worldName.style.left = (window.innerWidth/2-150) + 'px';

        //difficulties
        textSize(20);
        text('Difficulty:', 400, 270);

        difficulties.style.display = "initial";
        difficulties.style.top = ((window.innerHeight-HEIGHT)/2+290) + 'px';
        difficulties.style.left = (window.innerWidth/2-150) + 'px';

        //button submit
        if (isHovering(WIDTH/4-145/2, 508, 145, 32) === false) {
            ctx.drawImage(buttonImage, 0, 0, 291, 64, WIDTH/4-145/2, 508, 145, 32);
        }
        if (isHovering(WIDTH/4-145/2, 508, 145, 32) === true && mousePressed === false) {
            ctx.drawImage(buttonImage, 0, 64, 291, 64, WIDTH/4-145/2, 508, 145, 32);
        }
        if (isHovering(WIDTH/4-145/2, 508, 145, 32) === true && mousePressed === true) {
            var worldMapData = [];

            noiseCreate(worldWidth/10, worldHeight/10);
            
		    for(var x = 0; x < worldWidth; x++){
			    for(var y = 0; y < worldHeight; y++){
                    var v = Math.abs(noiseGet(x, y));

                    worldMapData.push(v);
			    }
            }

            ctx.drawImage(buttonImage, 0, 128, 291, 64, WIDTH/4-145/2, 508, 145, 32);
            scene = "gameSelect";
            devWorld = [[[worldName.value], [difficulties.value]], [worldMapData]];
            worlds.push(devWorld);
            mousePressed = false;
        
            sound.src = '../Recources/Sounds/button1.ogg';
            sound.play();

            worldName.style.display = "none";
            difficulties.style.display = "none";
        }
        
        fill(0);
        noStroke();
        textSize(15);
        text("Create World", WIDTH/4, 530);

        //button cancel
        if (isHovering(WIDTH/4*3-145/2, 508, 145, 32) === false) {
            ctx.drawImage(buttonImage, 0, 0, 291, 64, WIDTH/4*3-145/2, 508, 145, 32);
        }
        if (isHovering(WIDTH/4*3-145/2, 508, 145, 32) === true && mousePressed === false) {
            ctx.drawImage(buttonImage, 0, 64, 291, 64, WIDTH/4*3-145/2, 508, 145, 32);
        }
        if (isHovering(WIDTH/4*3-145/2, 508, 145, 32) === true && mousePressed === true) {
            ctx.drawImage(buttonImage, 0, 128, 291, 64, WIDTH/4*3-145/2, 508, 145, 32);
            scene = "gameSelect";
            devWorld = [];
            mousePressed = false;
        
            sound.src = '../Recources/Sounds/button1.ogg';
            sound.play();

            worldName.style.display = "none";
            difficulties.style.display = "none";
        }
        
        fill(0);
        noStroke();
        textSize(15);
        text("Cancel", WIDTH/4*3, 530);
    }
    if (scene === "areYouSure") {
        ctx.drawImage(backgroundImage, 0, 0);
        
        fill(0);
        textSize(75);
        text("Are You Sure", WIDTH/2, 100);

        textSize(30);
        text("You can't undo this action.", WIDTH/2, 300);

        //buttons
        if (isHovering(WIDTH/4-291/2, 450, 291, 64) === false) {
            ctx.drawImage(buttonImage, 0, 0, 291, 64, WIDTH/4-291/2, 450, 291, 64);
        }
        if (isHovering(WIDTH/4-291/2, 450, 291, 64) === true && mousePressed === false) {
            ctx.drawImage(buttonImage, 0, 64, 291, 64, WIDTH/4-291/2, 450, 291, 64);
        }
        if (isHovering(WIDTH/4-291/2, 450, 291, 64) === true && mousePressed === true) {
            ctx.drawImage(buttonImage, 0, 128, 291, 64, WIDTH/4-291/2, 450, 291, 64);
            scene = 'gameSelect';
            mousePressed = false;

            sound.src = '../Recources/Sounds/button1.ogg';
            sound.play();
        }

        fill(0);
        textSize(30);
        text("Cancel", WIDTH/4, 492);

        if (isHovering(WIDTH/4*3-291/2, 450, 291, 64) === false) {
            ctx.drawImage(buttonImage, 0, 0, 291, 64, WIDTH/4*3-291/2, 450, 291, 64);
        }
        if (isHovering(WIDTH/4*3-291/2, 450, 291, 64) === true && mousePressed === false) {
            ctx.drawImage(buttonImage, 0, 64, 291, 64, WIDTH/4*3-291/2, 450, 291, 64);
        }
        if (isHovering(WIDTH/4*3-291/2, 450, 291, 64) === true && mousePressed === true) {
            ctx.drawImage(buttonImage, 0, 128, 291, 64, WIDTH/4*3-291/2, 450, 291, 64);
            scene = 'gameSelect';
            mousePressed = false;

            worlds.splice(deleteWorldElement, 1);

            sound.src = '../Recources/Sounds/trash.ogg';
            sound.play();
        }

        text("Confirm", WIDTH/4*3, 492);
    }
    if (scene === "loading") {
        //starting procedures
        if (frame === 0) {
            var oldScoutFrames = [];
            for (var y = 0; y < scoutFrames.length; y++) {
                for (var x = 0; x < scoutFrames[0].length; x++) {
                    oldScoutFrames.push(scoutFrames[y][x]);
                    scoutFrames[y][x] = new Image();
                }
            }

            for (var y = 0; y < scoutFrames.length; y++) {
                for (var x = 0; x < scoutFrames[0].length; x++) {
                    scoutFrames[y][x].src = '../Recources/Graphics/sprites/scout/' + oldScoutFrames[y * 5 + x];
                }
            }
        }
        ctx.drawImage(backgroundImage, 0, 0);

        for(var x = 0; x < 250; x++) {
            for(var y = frame; y <= frame; y++) {
                if (worlds[worldPlaying][1][0][y*worldWidth+x] === 3 && ctx.fillStyle !== 'rgb(66, 99, 48)') {
                    CTX.fillStyle = 'rgb(66, 99, 48)';
                }
                else if (worlds[worldPlaying][1][0][y*worldWidth+x] === 2 && ctx.fillStyle !== 'rgb(188, 177, 145)') {
                    CTX.fillStyle = 'rgb(188, 177, 145)';
                }
                else if (worlds[worldPlaying][1][0][y*worldWidth+x] === 1 && ctx.fillStyle !== 'rgb(199, 141, 148)') {
                    CTX.fillStyle = 'rgb(119, 141, 148)';
                }
                else if (worlds[worldPlaying][1][0][y*worldWidth+x] === 0 && ctx.fillStyle !== 'rgb(60, 99, 130)') {
                    CTX.fillStyle = 'rgb(60, 99, 130)';
                }

                CTX.beginPath();
                CTX.rect(x, y, 1, 1);
                CTX.fill();
                CTX.closePath();
            }
        }

        landscapeImage = CTX.getImageData(0, 0, 250, frame+1);
        ctx.putImageData(landscapeImage, 275, 175);

        fill(0);
        textSize(20);
        if (Math.floor(frame/10)-Math.floor(Math.floor(frame/10)/4)*4 === 0){
            text('LOADING', 400, 500);
        }
        else if (Math.floor(frame/10)-Math.floor(Math.floor(frame/10)/4)*4 === 1){
            text('LOADING.', 400, 500);
        }
        else if (Math.floor(frame/10)-Math.floor(Math.floor(frame/10)/4)*4 === 2){
            text('LOADING..', 400, 500);
        }
        else {
            text('LOADING...', 400, 500);
        }

        //final procedures
        if (frame === 249) {
            scene = 'playing';

            for (var i = 0; i < worldHeight/10; i++) {
                discoveredChunks[i] = [];
            }
        }

        frame++;
    }
    if (scene === "playing") {
        WIDTH = 1100;
        canvas.width = WIDTH;

        //draw background
        ctx.drawImage(deep, -320, 0);
        ctx.drawImage(deep, 320, 0);
        ctx.drawImage(deep, 800, 80);
        ctx.drawImage(deep, 800, 300);
        ctx.drawImage(deep, 0, -160);
        ctx.drawImage(deep, 0, 160);
        ctx.drawImage(deep, 640, -160);
        ctx.drawImage(deep, -320, 320);
        ctx.drawImage(deep, 0, 480);
        ctx.drawImage(deep, 320, 320)
        ctx.drawImage(deep, 640, 480);
        ctx.drawImage(deep, 640, 160);

        //draw tiles
        for (var i = 0; i < worlds[worldPlaying][1][0].length; i++) {
            var getX = i-worldHeight*Math.floor(i/worldWidth);
            var getY = Math.floor(i/worldWidth);

            var posX = (getX/2-getY/2)*64-worldScrollX;
            var posY = (getY/2+getX/2)*32-worldScrollY;

            if (posX > -64 && posX < 800 && posY > -64 && posY < HEIGHT && getX !== 0 && getY !== 0 && getX !== worldWidth-1 && getY !== worldHeight-1) {
                if (worlds[worldPlaying][1][0][i] === 3) {
                    if (worlds[worldPlaying][1][0][i + 1] === 3
                        && worlds[worldPlaying][1][0][i + 1 + worldWidth] === 3
                        && worlds[worldPlaying][1][0][i + worldWidth] === 3 
                        && worlds[worldPlaying][1][0][i - 1 + worldWidth] === 3
                        && worlds[worldPlaying][1][0][i - 1] === 3 
                        && worlds[worldPlaying][1][0][i - 1 - worldWidth] === 3
                        && worlds[worldPlaying][1][0][i - worldWidth] === 3 
                        && worlds[worldPlaying][1][0][i - worldWidth + 1] === 3) {

                        ctx.drawImage(grass, posX, posY);
                    }
                    else if (worlds[worldPlaying][1][0][i + 1] === 3
                        && worlds[worldPlaying][1][0][i + worldWidth] === 2
                        && worlds[worldPlaying][1][0][i - 1 - worldWidth] === 3
                        && worlds[worldPlaying][1][0][i - worldWidth] === 3
                        && (worlds[worldPlaying][1][0][i + 1] === 3
                        && worlds[worldPlaying][1][0][i - 1] === 3)) {

                        ctx.drawImage(grassBeachStraight45, posX, posY);
                    }
                    else if (worlds[worldPlaying][1][0][i - worldWidth] === 3
                        && worlds[worldPlaying][1][0][i + 1] === 2
                        && worlds[worldPlaying][1][0][i - worldWidth - 1] === 3
                        && worlds[worldPlaying][1][0][i - worldWidth] === 3
                        && (worlds[worldPlaying][1][0][i - worldWidth] === 3 
                        && worlds[worldPlaying][1][0][i + worldWidth] === 3)) {

                        ctx.drawImage(grassBeachStraight135, posX, posY);
                    }
                    else if (worlds[worldPlaying][1][0][i - 1] === 3
                        && worlds[worldPlaying][1][0][i - worldWidth] === 2
                        && worlds[worldPlaying][1][0][i + 1 + worldWidth] === 3
                        && worlds[worldPlaying][1][0][i + worldWidth] === 3
                        && (worlds[worldPlaying][1][0][i - 1] === 3 
                        && worlds[worldPlaying][1][0][i + 1] === 3)) {

                        ctx.drawImage(grassBeachStraight225, posX, posY);
                    }
                    else if (worlds[worldPlaying][1][0][i + worldWidth] === 3
                        && worlds[worldPlaying][1][0][i - 1] === 2
                        && worlds[worldPlaying][1][0][i + worldWidth + 1] === 3
                        && worlds[worldPlaying][1][0][i + worldWidth] === 3
                        && (worlds[worldPlaying][1][0][i + worldWidth] === 3 
                        && worlds[worldPlaying][1][0][i - worldWidth] === 3)) {

                        ctx.drawImage(grassBeachStraight315, posX, posY);
                    }
                    else if (worlds[worldPlaying][1][0][i + 1] === 3 
                        && worlds[worldPlaying][1][0][i + 1 + worldWidth] === 3
                        && worlds[worldPlaying][1][0][i + worldWidth] === 3 
                        && worlds[worldPlaying][1][0][i - 1 + worldWidth] === 2
                        && worlds[worldPlaying][1][0][i - 1] === 3 
                        && worlds[worldPlaying][1][0][i - 1 - worldWidth] === 3
                        && worlds[worldPlaying][1][0][i - worldWidth] === 3 
                        && worlds[worldPlaying][1][0][i - worldWidth + 1] === 3) {

                        ctx.drawImage(grassBeachCurve_In45, posX, posY);
                    }
                    else if (worlds[worldPlaying][1][0][i - 1] === 3 
                        && worlds[worldPlaying][1][0][i - 1 - worldWidth] === 3
                        && worlds[worldPlaying][1][0][i - worldWidth] === 3 
                        && worlds[worldPlaying][1][0][i + 1 - worldWidth] === 2
                        && worlds[worldPlaying][1][0][i + 1] === 3 
                        && worlds[worldPlaying][1][0][i + 1 + worldWidth] === 3
                        && worlds[worldPlaying][1][0][i + worldWidth] === 3 
                        && worlds[worldPlaying][1][0][i + worldWidth - 1] === 3) {

                        ctx.drawImage(grassBeachCurve_In225, posX, posY);
                    }
                    else if (worlds[worldPlaying][1][0][i - worldWidth] === 3 
                        && worlds[worldPlaying][1][0][i - worldWidth - 1] === 3
                        && worlds[worldPlaying][1][0][i - 1] === 3 
                        && worlds[worldPlaying][1][0][i + worldWidth - 1] === 3
                        && worlds[worldPlaying][1][0][i + worldWidth] === 3 
                        && worlds[worldPlaying][1][0][i + worldWidth + 1] === 2
                        && worlds[worldPlaying][1][0][i + 1] === 3 
                        && worlds[worldPlaying][1][0][i + worldWidth - 1] === 3) {

                        ctx.drawImage(grassBeachCurve_In135, posX, posY);
                    }
                    else if (worlds[worldPlaying][1][0][i + worldWidth] === 3 
                        && worlds[worldPlaying][1][0][i + worldWidth + 1] === 3
                        && worlds[worldPlaying][1][0][i + 1] === 3 
                        && worlds[worldPlaying][1][0][i - worldWidth + 1] === 3
                        && worlds[worldPlaying][1][0][i - worldWidth] === 3 
                        && worlds[worldPlaying][1][0][i - worldWidth - 1] === 2
                        && worlds[worldPlaying][1][0][i - 1] === 3 
                        && worlds[worldPlaying][1][0][i - worldWidth + 1] === 3) {

                        ctx.drawImage(grassBeachCurve_In315, posX, posY);
                    }
                    else if (worlds[worldPlaying][1][0][i + worldWidth] === 2
                        && worlds[worldPlaying][1][0][i + 1] === 3
                        && worlds[worldPlaying][1][0][i - worldWidth] === 3
                        && worlds[worldPlaying][1][0][i - 1] === 2) {

                        ctx.drawImage(grassBeachCurve_Out45, posX, posY);
                    }
                    else if (worlds[worldPlaying][1][0][i + worldWidth] === 2
                        && worlds[worldPlaying][1][0][i + 1] === 2
                        && worlds[worldPlaying][1][0][i - worldWidth] === 3
                        && worlds[worldPlaying][1][0][i - 1] === 3) {

                        ctx.drawImage(grassBeachCurve_Out135, posX, posY);
                    }
                    else if (worlds[worldPlaying][1][0][i + worldWidth] === 3
                        && worlds[worldPlaying][1][0][i + 1] === 2
                        && worlds[worldPlaying][1][0][i - worldWidth] === 2
                        && worlds[worldPlaying][1][0][i - 1] === 3) {

                        ctx.drawImage(grassBeachCurve_Out225, posX, posY);
                    }
                    else if (worlds[worldPlaying][1][0][i - worldWidth] === 2
                        && worlds[worldPlaying][1][0][i - 1] === 2
                        && worlds[worldPlaying][1][0][i + worldWidth] === 3
                        && worlds[worldPlaying][1][0][i + 1] === 3) {

                        ctx.drawImage(grassBeachCurve_Out315, posX, posY);
                    }
                }
                else if (worlds[worldPlaying][1][0][i] === 2) {
                    if (worlds[worldPlaying][1][0][i + 1] === 2
                        && worlds[worldPlaying][1][0][i + worldWidth] === 1
                        && worlds[worldPlaying][1][0][i - 1 - worldWidth] === 2
                        && worlds[worldPlaying][1][0][i - worldWidth] === 2
                        && (worlds[worldPlaying][1][0][i + 1] === 2
                        && worlds[worldPlaying][1][0][i - 1] === 2)) {

                        ctx.drawImage(beachShallowStraight45, posX, posY);
                    }
                    else if (worlds[worldPlaying][1][0][i - worldWidth] === 2
                        && worlds[worldPlaying][1][0][i + 1] === 1
                        && worlds[worldPlaying][1][0][i - worldWidth - 1] === 2
                        && worlds[worldPlaying][1][0][i - worldWidth] === 2
                        && (worlds[worldPlaying][1][0][i - worldWidth] === 2 
                        && worlds[worldPlaying][1][0][i + worldWidth] === 2)) {

                        ctx.drawImage(beachShallowStraight135, posX, posY);
                    }
                    else if (worlds[worldPlaying][1][0][i - 1] === 2
                        && worlds[worldPlaying][1][0][i - worldWidth] === 1
                        && worlds[worldPlaying][1][0][i + 1 + worldWidth] === 2
                        && worlds[worldPlaying][1][0][i + worldWidth] === 2
                        && (worlds[worldPlaying][1][0][i - 1] === 2 
                        && worlds[worldPlaying][1][0][i + 1] === 2)) {

                        ctx.drawImage(beachShallowStraight225, posX, posY);
                    }
                    else if (worlds[worldPlaying][1][0][i + worldWidth] === 2
                        && worlds[worldPlaying][1][0][i - 1] === 1
                        && worlds[worldPlaying][1][0][i + worldWidth + 1] === 2
                        && worlds[worldPlaying][1][0][i + worldWidth] === 2
                        && (worlds[worldPlaying][1][0][i + worldWidth] === 2
                        && worlds[worldPlaying][1][0][i - worldWidth] === 2)) {

                        ctx.drawImage(beachShallowStraight315, posX, posY);
                    }
                    else if (worlds[worldPlaying][1][0][i + 1] === 2
                        && worlds[worldPlaying][1][0][i + 1 + worldWidth] === 2
                        && worlds[worldPlaying][1][0][i + worldWidth] === 2
                        && worlds[worldPlaying][1][0][i - 1 + worldWidth] === 1
                        && worlds[worldPlaying][1][0][i - 1] === 2
                        && worlds[worldPlaying][1][0][i - 1 - worldWidth] === 2
                        && worlds[worldPlaying][1][0][i - worldWidth] === 2
                        && worlds[worldPlaying][1][0][i - worldWidth + 1] === 2) {

                        ctx.drawImage(beachShallowCurve_In45, posX, posY);
                    }
                    else if (worlds[worldPlaying][1][0][i - 1] === 2
                        && worlds[worldPlaying][1][0][i - 1 - worldWidth] === 2
                        && worlds[worldPlaying][1][0][i - worldWidth] === 2
                        && worlds[worldPlaying][1][0][i + 1 - worldWidth] === 1
                        && worlds[worldPlaying][1][0][i + 1] === 2
                        && worlds[worldPlaying][1][0][i + 1 + worldWidth] === 2
                        && worlds[worldPlaying][1][0][i + worldWidth] === 2
                        && worlds[worldPlaying][1][0][i + worldWidth - 1] === 2) {

                        ctx.drawImage(beachShallowCurve_In225, posX, posY);
                    }
                    else if (worlds[worldPlaying][1][0][i - worldWidth] === 2
                        && worlds[worldPlaying][1][0][i - worldWidth - 1] === 2
                        && worlds[worldPlaying][1][0][i - 1] === 2
                        && worlds[worldPlaying][1][0][i + worldWidth - 1] === 2
                        && worlds[worldPlaying][1][0][i + worldWidth] === 2
                        && worlds[worldPlaying][1][0][i + worldWidth + 1] === 1
                        && worlds[worldPlaying][1][0][i + 1] === 2
                        && worlds[worldPlaying][1][0][i + worldWidth - 1] === 2) {

                        ctx.drawImage(beachShallowCurve_In135, posX, posY);
                    }
                    else if (worlds[worldPlaying][1][0][i + worldWidth] === 2
                        && worlds[worldPlaying][1][0][i + worldWidth + 1] === 2
                        && worlds[worldPlaying][1][0][i + 1] === 2
                        && worlds[worldPlaying][1][0][i - worldWidth + 1] === 2
                        && worlds[worldPlaying][1][0][i - worldWidth] === 2
                        && worlds[worldPlaying][1][0][i - worldWidth - 1] === 1
                        && worlds[worldPlaying][1][0][i - 1] === 2
                        && worlds[worldPlaying][1][0][i - worldWidth + 1] === 2) {

                        ctx.drawImage(beachShallowCurve_In315, posX, posY);
                    }
                    else if (worlds[worldPlaying][1][0][i + worldWidth] === 1
                        && worlds[worldPlaying][1][0][i + 1] === 2
                        && worlds[worldPlaying][1][0][i - worldWidth] === 2
                        && worlds[worldPlaying][1][0][i - 1] === 1) {

                        ctx.drawImage(beachShallowCurve_Out45, posX, posY);
                    }
                    else if (worlds[worldPlaying][1][0][i + worldWidth] === 1
                        && worlds[worldPlaying][1][0][i + 1] === 1
                        && worlds[worldPlaying][1][0][i - worldWidth] === 2
                        && worlds[worldPlaying][1][0][i - 1] === 2) {

                        ctx.drawImage(beachShallowCurve_Out135, posX, posY);
                    }
                    else if (worlds[worldPlaying][1][0][i + worldWidth] === 2
                        && worlds[worldPlaying][1][0][i + 1] === 1
                        && worlds[worldPlaying][1][0][i - worldWidth] === 1
                        && worlds[worldPlaying][1][0][i - 1] === 2) {

                        ctx.drawImage(beachShallowCurve_Out225, posX, posY);
                    }
                    else if (worlds[worldPlaying][1][0][i - worldWidth] === 1
                        && worlds[worldPlaying][1][0][i - 1] === 1
                        && worlds[worldPlaying][1][0][i + worldWidth] === 2
                        && worlds[worldPlaying][1][0][i + 1] === 2) {

                        ctx.drawImage(beachShallowCurve_Out315, posX, posY);
                    }
                    else {
                        ctx.drawImage(beach, posX, posY)
                    }
                }
                else if (worlds[worldPlaying][1][0][i] === 1) {
                    if (worlds[worldPlaying][1][0][i + 1] === 1
                        && worlds[worldPlaying][1][0][i + worldWidth] === 0
                        && worlds[worldPlaying][1][0][i - 1 - worldWidth] === 1
                        && worlds[worldPlaying][1][0][i - worldWidth] === 1
                        && (worlds[worldPlaying][1][0][i + 1] === 1
                        && worlds[worldPlaying][1][0][i - 1] === 1)) {

                        ctx.drawImage(shallowDeepStraight45, posX, posY);
                    }
                    else if (worlds[worldPlaying][1][0][i - worldWidth] === 1
                        && worlds[worldPlaying][1][0][i + 1] === 0
                        && worlds[worldPlaying][1][0][i - worldWidth - 1] === 1
                        && worlds[worldPlaying][1][0][i - worldWidth] === 1
                        && (worlds[worldPlaying][1][0][i - worldWidth] === 1
                        && worlds[worldPlaying][1][0][i + worldWidth] === 1)) {

                        ctx.drawImage(shallowDeepStraight135, posX, posY);
                    }
                    else if (worlds[worldPlaying][1][0][i - 1] === 1
                        && worlds[worldPlaying][1][0][i - worldWidth] === 0
                        && worlds[worldPlaying][1][0][i + 1 + worldWidth] === 1
                        && worlds[worldPlaying][1][0][i + worldWidth] === 1
                        && (worlds[worldPlaying][1][0][i - 1] === 1
                        && worlds[worldPlaying][1][0][i + 1] === 1)) {

                        ctx.drawImage(shallowDeepStraight225, posX, posY);
                    }
                    else if (worlds[worldPlaying][1][0][i + worldWidth] === 1
                        && worlds[worldPlaying][1][0][i - 1] === 0
                        && worlds[worldPlaying][1][0][i + worldWidth + 1] === 1
                        && worlds[worldPlaying][1][0][i + worldWidth] === 1
                        && (worlds[worldPlaying][1][0][i + worldWidth] === 1
                        && worlds[worldPlaying][1][0][i - worldWidth] === 1)) {

                        ctx.drawImage(shallowDeepStraight315, posX, posY);
                    }
                    else if (worlds[worldPlaying][1][0][i + 1] === 1
                        && worlds[worldPlaying][1][0][i + worldWidth] === 1
                        && worlds[worldPlaying][1][0][i - 1] === 1
                        && worlds[worldPlaying][1][0][i - worldWidth] === 1
                        && worlds[worldPlaying][1][0][i + worldWidth-1] === 0) {

                        ctx.drawImage(shallowDeepCurve_In45, posX, posY);
                    }
                    else if (worlds[worldPlaying][1][0][i - worldWidth] === 1
                        && worlds[worldPlaying][1][0][i - 1] === 1
                        && worlds[worldPlaying][1][0][i + worldWidth] === 1
                        && worlds[worldPlaying][1][0][i + worldWidth + 1] === 0
                        && worlds[worldPlaying][1][0][i + 1] === 1) {

                        ctx.drawImage(shallowDeepCurve_In135, posX, posY);
                    }
                    else if (worlds[worldPlaying][1][0][i - 1] === 1
                        && worlds[worldPlaying][1][0][i - worldWidth] === 1
                        && worlds[worldPlaying][1][0][i + 1 - worldWidth] === 0
                        && worlds[worldPlaying][1][0][i + 1] === 1
                        && worlds[worldPlaying][1][0][i + worldWidth] === 1) {

                        ctx.drawImage(shallowDeepCurve_In225, posX, posY);
                    }
                    else if (worlds[worldPlaying][1][0][i + worldWidth] === 1
                        && worlds[worldPlaying][1][0][i + 1] === 1
                        && worlds[worldPlaying][1][0][i - worldWidth] === 1
                        && worlds[worldPlaying][1][0][i - worldWidth - 1] === 0
                        && worlds[worldPlaying][1][0][i - 1] === 1) {

                        ctx.drawImage(shallowDeepCurve_In315, posX, posY);
                    }
                    else if (worlds[worldPlaying][1][0][i + worldWidth] === 0
                        && worlds[worldPlaying][1][0][i + 1] === 1
                        && worlds[worldPlaying][1][0][i - worldWidth] === 1
                        && worlds[worldPlaying][1][0][i - 1] === 0) {

                        ctx.drawImage(shallowDeepCurve_Out45, posX, posY);
                    }
                    else if (worlds[worldPlaying][1][0][i + worldWidth] === 0
                        && worlds[worldPlaying][1][0][i + 1] === 0
                        && worlds[worldPlaying][1][0][i - worldWidth] === 1
                        && worlds[worldPlaying][1][0][i - 1] === 1) {

                        ctx.drawImage(shallowDeepCurve_Out135, posX, posY);
                    }
                    else if (worlds[worldPlaying][1][0][i + worldWidth] === 1
                        && worlds[worldPlaying][1][0][i + 1] === 0
                        && worlds[worldPlaying][1][0][i - worldWidth] === 0
                        && worlds[worldPlaying][1][0][i - 1] === 1) {

                        ctx.drawImage(shallowDeepCurve_Out225, posX, posY);
                    }
                    else if (worlds[worldPlaying][1][0][i - worldWidth] === 0
                        && worlds[worldPlaying][1][0][i - 1] === 0
                        && worlds[worldPlaying][1][0][i + worldWidth] === 1
                        && worlds[worldPlaying][1][0][i + 1] === 1) {

                        ctx.drawImage(shallowDeepCurve_Out315, posX, posY);
                    }
                    else {
                        ctx.drawImage(shallow, posX, posY);
                    }
                }
            }
        }

        //draw frame
        ctx.drawImage(paperGui, 800, 10, 290, 580);

        for(var i = 0; i < 4; i++) {
            ctx.drawImage(playingGui, 893, 190, 73, 18, 800+73*i, 0, 73, 18);
            ctx.drawImage(playingGui, 893, 190, 73, 18, 800+73*i, 584, 73, 18);
        }
        for(var i = 0; i < 11; i++) {
            if (i !== 10) {
                ctx.drawImage(playingGui, 855, 227, 18, 55, 795, 5+55*i, 18, 55);
                ctx.drawImage(playingGui, 855, 227, 18, 55, 1083, 5+55*i, 18, 55);
            }
            else {
                ctx.drawImage(playingGui, 855, 227, 18, 40, 795, 5+55*i, 18, 40);
                ctx.drawImage(playingGui, 855, 227, 18, 40, 1083, 5+55*i, 18, 40);
            }
        }

        ctx.drawImage(playingGui, 855, 190, 25, 25, 795, 0, 25, 25);
        ctx.drawImage(playingGui, 978, 190, 25, 25, 1077, 0, 25, 25);
        ctx.drawImage(playingGui, 855, 294, 25, 25, 795, 576, 25, 25);
        ctx.drawImage(playingGui, 978, 294, 25, 25, 1077, 576, 25, 25);

        //map
        ctx.putImageData(landscapeImage, 825, 25);

        fill(200, 0, 0);
        noStroke();
        getX = (worldScrollX+400)/64;
        getY = (worldScrollY+300)/32;
        getX = Math.round(getX);
        getY = Math.round(getY);
        playerPosX = getY+getX;
        playerPosY = getY-getX;

        circle(playerPosX+825, playerPosY+25, 3);

        //move camera
        if (keys.includes('ArrowRight')) {
            worldScrollX += 5;
        }
        if (keys.includes('ArrowLeft')) {
            worldScrollX -= 5;
        }
        if (keys.includes('ArrowUp')) {
            worldScrollY -= 5;
        }
        if (keys.includes('ArrowDown')) {
            worldScrollY += 5;
        }

        runEntityAi();
    }

    //save data to localhost
    localStorage.setItem('worldsData', JSON.stringify(worlds));
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

var keys = [];

document.addEventListener('keydown', function(e) {
    keys.push(e.key);
});

document.addEventListener('keyup', function(e) {
    var newArr = [];
		for(var i = 0; i < keys.length; i++){
			if(keys[i] != e.key){
				newArr.push(keys[i]);
			}
		}
	keys = newArr;
});