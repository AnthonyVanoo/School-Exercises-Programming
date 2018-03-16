const UPDATEINTERVAL = 5;
const MAXRGB = 999999;
let canvasElem = document.getElementById("canvas");
let ctx = canvasElem.getContext("2d");
let message = document.getElementById("status_line");

let ballMoving = true;
let time= Date.now();
let keysDown = {};
let lives = 3;
 
window.addEventListener("keydown",function(e){
	// add code
    keysDown[e.key] = true;
});

window.addEventListener("keyup",function(e){
	//add code
    delete keysDown[e.key];
});

class brick {
    constructor (xVal,y) {
        this.xVal= 0;
        this.y = 59;
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
let brickArray = new Array();
brickArray[0] = new brick(88,20);
brickArray[1] = new brick(80,20);
brickArray[2] = new brick(160,20);
brickArray[3] = new brick(240,20);
brickArray[4] = new brick(320,20);
brickArray[5] = new brick(400,20);


// random color gen
let brickMax = brickArray.length;
let currentBrick = 0;
colorGen();

function colorGen() {
    while (currentBrick < brickMax ) {
        brickArray[currentBrick].color = "#" +  brickArray[currentBrick].randomColor(MAXRGB);
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
        }
		
		// check collide with right wall
		if (ballSprite.x + ballSprite.width > canvasElem.width) {
            ballSprite.xSpeed *= -1;
        }
		
		// check collide with top
		if (ballSprite.y < 0 ) {
            ballSprite.ySpeed *= -1;
        }
		
		// check collide with paddle
		if (( paddleSprite.height + ballSprite.y > paddleSprite.y  ) && (ballSprite.x >= paddleSprite.x) && (ballSprite.x <= (paddleSprite.x + paddleSprite.width))) {
            ballSprite.ySpeed *= -1;
        }
            
/*ballSprite.y is greater than paddleSprite.y AND ballSprite.x
is between paddleSprite.x and paddleSprite.x +paddleSprite.width
multiply ySpeed by -1*/
		
		// check if ball outside bottom of game area
        if (ballSprite.y > canvasElem.height){
            lives--;
            ballMoving = false;
            message.textContent = "Status: You lost a life! " + lives + " left";
        }
	    // set ballMoving = false if ball outside the game area
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
    ctx.fillStyle = brickArray[0].color;
    ctx.fillRect(brickArray[0].x,brickArray[0].y,brickArray[0].width,brickArray[0].height);
    
    ctx.fillStyle = brickArray[1].color;
    ctx.fillRect(brickArray[1].x,brickArray[1].y,brickArray[1].width,brickArray[1].height);
    
    
}

function run()
{
	updateGameState((Date.now() - time)/1000);
	renderGame();
	time = Date.now();
}

 setInterval(run,UPDATEINTERVAL);



function display_status(messagetoshow){
	let st_line = document.getElementById("status_line");
	st_line.firstChild.nodeValue = messagetoshow;

}