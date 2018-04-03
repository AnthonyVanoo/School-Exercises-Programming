const UPDATEINTERVAL = 5;
const MAXRGB = 999999;
const BALLRIGHTBOUNCESAFE = 620;
const BALLPADDLETOPBOUNCESAFE = 340;
let canvasElem = document.getElementById("canvas");
let ctx = canvasElem.getContext("2d");
//let message = document.getElementById("status_line");
let gameState = true;

let ballMoving = false;
let time= Date.now();
let keysDown = {};
let amountToBreak = 23;
let lives = 3;
let statusMessage = "";
let points = 0;
let winLose = "nothing";
 
window.addEventListener("keydown",function(e){
	// add code
    keysDown[e.key] = true;
    console.log(keysDown);
});

window.addEventListener("keyup",function(e){
	//add code
    delete keysDown[e.key];
});

class brick {
    constructor (xVal,yVal) {
        this.xVal = xVal;
        this.yVal = yVal;
        this.width = 80;
        this.height = 15;
        this.visibility = true;
        this.color = "#100000";
    }
    randomColor(maxval) {
        if(maxval >100000) {
		  return Math.floor(1 + (Math.random()*maxval));
        } else {
		  return 1;
        }
    }
}


let brickArray = [];
let brickArray2 = [];
let brickArray3 = [];
/*
* WHY YOU NO WORK????
* FIXED!! made the xVal and yVal = to the same???(xVal = xval) Why did it need to be that?
*/
brickArray[0] = new brick(0,50);
brickArray[1] = new brick(80,50);
brickArray[2] = new brick(160,50);
brickArray[3] = new brick(240,50);
brickArray[4] = new brick(320,50);
brickArray[5] = new brick(400,50);
brickArray[6] = new brick(480,50);
brickArray[7] = new brick(560,50);
// check the values console.log(brickArray);
brickArray2[0] = new brick(40,35);
brickArray2[1] = new brick(120,35);
brickArray2[2] = new brick(200,35);
brickArray2[3] = new brick(280,35);
brickArray2[4] = new brick(360,35);
brickArray2[5] = new brick(440,35);
brickArray2[6] = new brick(520,35);
brickArray2[7] = new brick(800,35);

brickArray3[0] = new brick(0,20);
brickArray3[1] = new brick(80,20);
brickArray3[2] = new brick(160,20);
brickArray3[3] = new brick(240,20);
brickArray3[4] = new brick(320,20);
brickArray3[5] = new brick(400,20);
brickArray3[6] = new brick(480,20);
brickArray3[7] = new brick(560,20);

// random color gen
let brickMax = brickArray.length;
let currentBrick = 0;
colorGen();

function colorGen() {
    while (currentBrick < brickMax ) {
        brickArray[currentBrick].color = "#" +  brickArray[currentBrick].randomColor(MAXRGB);
        brickArray2[currentBrick].color = "#" +  brickArray2[currentBrick].randomColor(MAXRGB);
        brickArray3[currentBrick].color = "#" +  brickArray3[currentBrick].randomColor(MAXRGB);
        currentBrick++;  
    }
}


let ballSprite = {
	x: 160,
	y: 200,
	width: 20,
	height: 20,
	xSpeed: 100,
	ySpeed: -100,
	colour: "#cc0000"
};

let paddleSprite = {
	x: 200,
	y: 360,
	width: 80,
	height: 15,
	speed: 200,
	colour: "#cccc00"
};


function updateGameState(secs)
{
	if("ArrowLeft" in keysDown)
	{
        // move paddle left if there is space to do so
        if(paddleSprite.x > 0 ) {
           paddleSprite.x -= paddleSprite.speed * secs;
        }
	}
	
	if("ArrowRight" in keysDown)
	{
		// move paddle left if there is space to do so
        if( paddleSprite.x + paddleSprite.width < canvasElem.width ) {
           paddleSprite.x += paddleSprite.speed * secs;
        }
	}
	
	if(ballMoving){
		//update ball position
        ballSprite.x += ballSprite.xSpeed * secs;
        ballSprite.y += ballSprite.ySpeed * secs;
        
		
	
		//check collide with left wall
		if (ballSprite.x < 0 ) {
            ballSprite.xSpeed *= -1;
            ballSprite.x = 0;
        }
		
		// check collide with right wall
		if (ballSprite.x + ballSprite.width > canvasElem.width) {
            ballSprite.xSpeed *= -1;
            ballSprite.x = BALLRIGHTBOUNCESAFE;
        }
		
		// check collide with top
		if (ballSprite.y < 0 ) {
            ballSprite.ySpeed *= -1;
            ballSprite.y = 0;
        }
		
		// check collide with paddle
		if (( paddleSprite.height + ballSprite.y > paddleSprite.y  ) && (ballSprite.x >= paddleSprite.x) && (ballSprite.x <= (paddleSprite.x + paddleSprite.width))) {
            ballSprite.ySpeed *= -1;
            ballSprite.y = BALLPADDLETOPBOUNCESAFE;
        }
            
/*ballSprite.y is greater than paddleSprite.y AND ballSprite.x
is between paddleSprite.x and paddleSprite.x +paddleSprite.width
multiply ySpeed by -1*/
		
		// check if ball outside bottom of game area
        if (ballSprite.y > canvasElem.height){
            lives--;
            // set ballMoving = false if ball outside the game area
            ballMoving = false;
            if (lives > 0 ){
                // message.textContent = "Status: You lost a life! " + lives + " left";
                resetBall();
            } else {
                // message.textContent = "Game over";
                winLose = "lost";
                gameState = false;
                
            }
            
        }
	    
    }
    /*
    * need a way to check each bricks visibility level
    * if one has it false then it need to disappear
    */
    for (let i = 0; i < brickArray.length; i++) {
        
        if (brickArray[i].visibility) {
                    //15 + 200 < 40 & x >= 0
            if ((ballSprite.y < brickArray[i].yVal + brickArray[i].height  ) && (ballSprite.x >= brickArray[i].xVal) && (ballSprite.x <= (brickArray[i].xVal + brickArray[i].width))) {
                ballSprite.ySpeed *= -1.1;
                brickArray[i].visibility = false;
                points += 5;
                amountToBreak--;
            }
        }
    }
    for (let i = 0; i < brickArray2.length; i++) {
        
        if (brickArray2[i].visibility) {
            if ((ballSprite.y < brickArray2[i].yVal + brickArray2[i].height  ) && (ballSprite.x >= brickArray2[i].xVal) && (ballSprite.x <= (brickArray2[i].xVal + brickArray2[i].width))) {
                ballSprite.ySpeed *= -1.1;
                brickArray2[i].visibility = false;
                points += 5;
                amountToBreak--;
            }
        }
    }
    for (let i = 0; i < brickArray3.length; i++) {
        
        if (brickArray3[i].visibility) {
                    //15 + 200 < 40 & x >= 0
            if ((ballSprite.y < brickArray3[i].yVal + brickArray3[i].height  ) && (ballSprite.x >= brickArray3[i].xVal) && (ballSprite.x <= (brickArray3[i].xVal + brickArray3[i].width))) {
                ballSprite.ySpeed *= -1.1;
                brickArray3[i].visibility = false;
                points += 5;
                amountToBreak--;
            }
        }
    }
    if (amountToBreak == 0 ){
        // message.textContent = "YOU WIN!!"
        winLose = "won";
        ballMoving = false;
        gameState = false;
    }
}

function resetBall() {
    if ( lives > 0 ){
        ballSprite.ySpeed = -100;
        ballSprite.x = 130;
        ballSprite.y = 180;
        ballMoving = true;
    }
}

function renderGame()
{
	// draw the background with a solid colour
    ctx.fillStyle = "black";
	ctx.fillRect(0,0,canvasElem.width,canvasElem.height);
	// draw the paddle sprite
    ctx.fillStyle = paddleSprite.colour;
	ctx.fillRect(paddleSprite.x,paddleSprite.y,paddleSprite.width,paddleSprite.height);
    
	// draw the ball sprite
    ctx.fillStyle = ballSprite.colour;
	ctx.fillRect(ballSprite.x,ballSprite.y,ballSprite.width,ballSprite.height);
    
    //lay down the top bricks
    for (let i = 0; i < brickArray.length; i++) {
        
        if (brickArray[i].visibility) {
            ctx.fillStyle = brickArray[i].color;
            ctx.fillRect(brickArray[i].xVal,brickArray[i].yVal,brickArray[i].width,brickArray[i].height);
        }
    }
    for (let i = 0; i < brickArray.length; i++) {
        
        if (brickArray2[i].visibility) {
            ctx.fillStyle = brickArray2[i].color;
            ctx.fillRect(brickArray2[i].xVal,brickArray2[i].yVal,brickArray2[i].width,brickArray2[i].height);
        }
    }
    for (let i = 0; i < brickArray.length; i++) {
        
        if (brickArray3[i].visibility) {
            ctx.fillStyle = brickArray3[i].color;
            ctx.fillRect(brickArray3[i].xVal,brickArray3[i].yVal,brickArray3[i].width,brickArray3[i].height);
        }
    }
    // HUD
    ctx.fillStyle ="red";
    ctx.font="20px Verdana";
    statusMessage = "Lives: " + lives;
    ctx.fillText(statusMessage,20,450);
    statusMessage = "Score: " + points;
    ctx.fillText(statusMessage,500,450);
    
    if (winLose == "won") {
        ctx.strokeStyle ="red";
        ctx.font="80px Verdana";
        ctx.strokeText("YOU WIN!",110,250);
    } else if (winLose == "lost") {
        ctx.strokeStyle ="red";
        ctx.font="80px Verdana";
        ctx.strokeText("GAME OVER",80,250);
    } else {
        
    }
    
    
}

function run() {
    //clearInterval(checkIntv);
	updateGameState((Date.now() - time)/1000);
	renderGame();
	time = Date.now();
    //fix for ball moving too soon
    if (gameState) {
       ballMoving = true; 
    }
    
}

//setInterval(run,UPDATEINTERVAL);

var checkIntv = 0;
startSplashScreen();


function startSplashScreen(){
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvasElem.width,canvasElem.height);
    ctx.strokeStyle ="red";
    ctx.font="80px Verdana";
    ctx.strokeText("Breakout!",120,170);
    ctx.fillStyle = "yellow";
    ctx.fillRect(250,300,130,60);
    ctx.fillStyle = "red";
    ctx.font = "18px Verdana";
    ctx.fillText("Enter to start",254,330);
    
    checkIntv = setInterval(checkSplashScreen,200);
    
}

function checkSplashScreen() {
    //alert("spam");
    if("Enter" in keysDown) {
        //clearInterval(checkIntv);
        //alert("Game started");
        checkIntv = setInterval(run,UPDATEINTERVAL);
    }
}


/*function display_status(messagetoshow){
	let st_line = document.getElementById("status_line");
	st_line.firstChild.nodeValue = messagetoshow;

}*/