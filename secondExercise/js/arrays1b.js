let inputElem = document.getElementById("nameInput");
let addName = document.getElementById("addName");
let buttonElem = document.getElementById("showButton");
let outputElem = document.getElementById("outputMsg");
let clearBtn = document.getElementById("clearArray");

let nameArray = new Array(5);
let nameAmount = 0;

addName.addEventListener('click', addNameFunction);
buttonElem.addEventListener('click', listNames);
clearBtn.addEventListener('click', clearArrayFunction);

function addNameFunction () {
    if (nameAmount < 5) {
        //testing alert(nameAmount);
        nameArray[nameAmount] = inputElem.value;
        //testing alert(inputElem.value);
        outputElem.textContent = "Name added: " + nameArray[nameAmount];
        nameAmount++;
    } else {
        outputElem.textContent = "Can only add 5 names";
    }
    //testing alert(nameAmount);
}

function listNames () {
    msg = "";
    for (let i = 0; i < 5; i++) {
        msg += nameArray[i] + ", " 
    }
    
    outputElem.innerHTML = "Student names are: " + msg;
    
}

function clearArrayFunction () {
    nameArray.length = 0;
    nameAmount = 0;
    outputElem.textContent = "The names have been deleted"
}