/*let inputElem = document.getElementById("tableValue");*/
let buttonElem = document.getElementById("showButton");
let outputElem = document.getElementById("outputMsg");

let nameArray = ["Jack", "Klive", "Bill", "Timmy", "Harg"];

buttonElem.addEventListener('click', listNames);

function listNames () {
    msg = "";
    for (let i = 0; i < 5; i++) {
        msg += nameArray[i] + ", " 
    }
    
    outputElem.innerHTML = "Student names are: " + msg;
    
}