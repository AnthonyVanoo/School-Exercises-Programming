'use strict';
let c1 = document.getElementById("card1");//d
let c2 = document.getElementById("card2");//h
let c3 = document.getElementById("card3");//s
let c4 = document.getElementById("card4");//c
let msgArea = document.getElementById("status_line");


//Drop zones
let heartDropZone = document.getElementById("dropzonehearts");
let clubDropZone = document.getElementById("dropzoneclubs");
let spadeDropZone = document.getElementById("dropzonespades");
let diamondDropZone = document.getElementById("dropzonediamonds");

/*Add event listeners for:
* possibly for each card being dragged
* separate function for dragover event listener(can check the datatype)
* again for when it is dropped
* same function for leaving
*/
heartDropZone.addEventListener('dragover',checkHeart);
clubDropZone.addEventListener('dragover',checkClub);
spadeDropZone.addEventListener('dragover',checkSpade);
diamondDropZone.addEventListener('dragover',checkDiamond);

heartDropZone.addEventListener('dragleave',restoreElement);
clubDropZone.addEventListener('dragleave',restoreElement);
spadeDropZone.addEventListener('dragleave',restoreElement);
diamondDropZone.addEventListener('dragleave',restoreElement);

heartDropZone.addEventListener('drop',heartDrop);
clubDropZone.addEventListener('drop',clubDrop);
spadeDropZone.addEventListener('drop',spadeDrop);
diamondDropZone.addEventListener('drop',diamondDrop);

let attrVal = "fish";

function display_status(messagetoshow)
{
	let st_line = document.getElementById("status_line");
	st_line.firstChild.nodeValue = messagetoshow;

}

c1.addEventListener('dragstart',function(e){
	e.dataTransfer.setData("text/plain",e.target.id);
    attrVal = "diamond";
});
c2.addEventListener('dragstart',function(e){
	e.dataTransfer.setData("text/plain",e.target.id);
    attrVal = "heart";
});
c3.addEventListener('dragstart',function(e){
	e.dataTransfer.setData("text/plain",e.target.id);
    attrVal = "spade";
});
c4.addEventListener('dragstart',function(e){
	e.dataTransfer.setData("text/plain",e.target.id);
    attrVal = "club";
});

//miten se toimi var attrValue = elemRef.getAttribute("data-suit");

function restoreElement(e){
	e.target.style.borderColor = "Black";
}

function checkHeart(e) {
    if (attrVal === "heart") {
        e.target.style.borderColor = "cyan";
    }
    e.preventDefault();
    display_status("id of element entered: " + e.target.id);
	
}

function heartDrop(e) {
    if (attrVal === "heart") {
        e.preventDefault();
        let herp = e.dataTransfer.getData("Text");
        e.target.appendChild(document.getElementById(herp));
        heartDropZone.style.borderColor = "Black";
    } else {
        msgArea.textContent = "Sorry wrong area, try a different one."
    }
}

function checkClub(e) {
    if (attrVal == "club") {
        e.target.style.borderColor = "cyan";
    }
	e.preventDefault();
    display_status("id of element entered: " + e.target.id);
}

function clubDrop(e) {
    if (attrVal == "club") {
        e.preventDefault();
        let herp = e.dataTransfer.getData("Text");
        e.target.appendChild(document.getElementById(herp));
        clubDropZone.style.borderColor = "Black";
    } else {
        msgArea.textContent = "Sorry wrong area, try a different one."
    }
}

function checkSpade(e) {
    if (attrVal == "spade") {
        e.target.style.borderColor = "cyan";
    }
	e.preventDefault();
    display_status("id of element entered: " + e.target.id);
}

function spadeDrop(e) {
    if (attrVal == "spade") {
        e.preventDefault();
        let herp = e.dataTransfer.getData("Text");
        e.target.appendChild(document.getElementById(herp));
        spadeDropZone.style.borderColor = "Black";
    } else {
        msgArea.textContent = "Sorry wrong area, try a different one."
    }
}

function checkDiamond(e) {
    if (attrVal == "diamond") {
        e.target.style.borderColor = "cyan";
    }
    e.preventDefault();
    display_status("id of element entered: " + e.target.id);
	
}

function diamondDrop(e) {
    if (attrVal == "diamond") {
        e.preventDefault();
        let herp = e.dataTransfer.getData("Text");
        e.target.appendChild(document.getElementById(herp));
        diamondDropZone.style.borderColor = "Black";
    } else {
        msgArea.textContent = "Sorry wrong area, try a different one."
    }
}




