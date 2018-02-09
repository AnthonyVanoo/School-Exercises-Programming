'use strict';
const MAXDICESCORE = 6;
const MAXTHROWSPERPLAYER = 3;
let
	player1Score = 0,
	player2Score = 0, 
	throwsCompleted= 0,
	playerToThrowNext = 1;
	
let gameInProgress = true;
	
// get references to status of game message 	
let statusLineElem = document.getElementById("statusLine");

// get references to buttons
let p1ButtonElem = document.getElementById("p1ThrowButton");
let p2ButtonElem = document.getElementById("p2ThrowButton");

//get references to dice images 
let p1d1ImgElem = document.getElementById("p1d1");
let p1d2ImgElem = document.getElementById("p1d2");
let p2d1ImgElem = document.getElementById("p2d1");
let p2d2ImgElem = document.getElementById("p2d2");

//get references to span elements containing scores for each player
let p1ScoreElem = document.getElementById("p1score");
let p2ScoreElem = document.getElementById("p2score");

// setup the event listeners so we can pass a parameter to the event handler function
p1ButtonElem.addEventListener('click', function(){playerThrows(1);} );
p2ButtonElem.addEventListener('click', function(){playerThrows(2);} );

function getRandom(maxval) {
	//return a random integer between 1 and maxval, if maxval is 0 or less, return 1
	if(maxval >1)
		return Math.floor(1 + (Math.random()*maxval));
	else
		return 1;
}

function playerThrows(thisplayer) {
	console.log("player number"+ thisplayer);
	//check that value of thisplayer is correct, with  console.log("player number"+ thisplayer);
	// check if playerToThrowNext is not this player, then return from the function immediately
    if ( thisplayer != playerToThrowNext ) {
        return;
    } else { 
        // in this case the user has pressed the wrong player button

        //get two scores and add to create a total score
        let die1 = getRandom(MAXDICESCORE);
        let die2 = getRandom(MAXDICESCORE);
        // test alert(die1);
        //update dice images and scores for this player
        let fileName1 = "images/dice" + die1 + ".png";
        let fileName2 = "images/dice" + die2 + ".png";

        if ( thisplayer == 1 ) {

            p1d1ImgElem.src = fileName1;
            p1d2ImgElem.src = fileName2;

        } else {
            p2d1ImgElem.src = fileName1;
            p2d2ImgElem.src = fileName2;
        }
        //call the updateGame function
        updateGame(thisplayer,die1,die2);    
	}
}
function updateGame(playerJustThrown,score1,score2) {
	
    if (playerJustThrown == 1 ) {
        player1Score += score1 + score2;
        p1ScoreElem.textContent = player1Score;
    } else {
        player2Score += score1 + score2;
        p2ScoreElem.textContent = player2Score;
    }
	//check whether the last throw was a double i.e. score1 and score2 are equal
    if ( score1 == score2 ) {
        //if yes, prompt the same player to throw again, and don't update the 'player to throw next'
        statusLineElem.textContent = "Player" + playerJustThrown + "got a double, roll again!";
        return;
    }
	
    if ( playerJustThrown == 1 ) {
        playerToThrowNext++;
        statusLineElem.textContent = "Player" + playerJustThrown + " turn is over, Player2 rolls next.";
    }
    
    if ( playerJustThrown == 2 ) {
        playerToThrowNext--;
        throwsCompleted++;
        statusLineElem.textContent = "Player" + playerJustThrown + " turn is over, Player1 rolls next.";
    }
	// if no, if playerJustThrown is player1, then make next player player2
	// update the status message accordingly
	// if no and if playerJustThrown is player2, check whether there are still more throws
	// no more throws call the gameOver() function
	if ( throwsCompleted >= MAXTHROWSPERPLAYER ){
        gameOver();
        return;
    }
}
function gameOver() {
	//decide who wins by comparing player1 and player 2 score
    if ( player1Score > player2Score) {
        statusLineElem.textContent = "Player 1 wins!";
    } else if ( player1Score == player2Score ) {
        statusLineElem.textContent = "It's a Draw!!";
    } else {
        statusLineElem.textContent = "Player 2 wins!";
    }
	//output an appropriate message
}

function displayStatus(messageToShow) {
	// set the textContent property of the object corresponding tothe status message
}
		  
