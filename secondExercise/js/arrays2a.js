let inputElem = document.getElementById("nameInput");
let addName = document.getElementById("addName");
let buttonElem = document.getElementById("showButton");
let outputElem = document.getElementById("outputMsg");
let clearBtn = document.getElementById("clearArray");

let nameArray = new Array(5);
let firstTaskArray = new Array(5);
let secondTaskArray = new Array(5);
let nameAmount = 0;
let studyPoints = 0;
let grade = 0;

addName.addEventListener('click', addNameFunction);
buttonElem.addEventListener('click', listNames);
clearBtn.addEventListener('click', clearArrayFunction);

function addNameFunction () {
    // Look up why these variables works when it is inside the function
    let firstTask = parseFloat(document.getElementById("task1Input").value);
    let secondTask = parseFloat(document.getElementById("task2Input").value);
    if (nameAmount < 5) {
        if (( firstTask >= 0) && (firstTask <= 100) && (secondTask >= 0) && (secondTask <= 100)) {
            //testing alert(nameAmount);
            nameArray[nameAmount] = inputElem.value;
            firstTaskArray[nameAmount] = firstTask;
            secondTaskArray[nameAmount] = secondTask;
            //testing alert(inputElem.value);
            outputElem.textContent = "Student info added: " + nameArray[nameAmount] + ", First task: " + firstTaskArray[nameAmount] + "%, Second task: " + secondTaskArray[nameAmount] + "%";
            nameAmount++;
        } else {
            outputElem.textContent = "Both task need to be a number between 0 - 100";
        }
        
    } else {
        outputElem.textContent = "Can only add 5 students";
    }
    //testing alert(nameAmount);
}

function listNames () {
    msg = "";
    for (let i = 0; i < 5; i++) {
        let taskAverage = (firstTaskArray[i] + secondTaskArray[i]) / 2;
        if (taskAverage >= 40 ) {
            studyPoints = 5;
        }
        if ( (taskAverage >= 40) || (taskAverage >= 44)) {
            grade = 1;
        }
        if ( (taskAverage >= 45) || (taskAverage >= 54)) {
            grade = 2;
        }
        if ( (taskAverage >= 55) || (taskAverage >= 64)) {
            grade = 3;
        }
        if ( (taskAverage >= 65) || (taskAverage >= 74)) {
            grade = 4;
        }
        if ( taskAverage >= 75) {
            grade = 5;
        }
        msg += "<br>" + nameArray[i] + ", first task: " + firstTaskArray[i] + "%, Second task: " + secondTaskArray[i] + "%, task average: " + taskAverage + "%, Study Points: " + studyPoints + ", Grade: " + grade;
    }
    
    outputElem.innerHTML = "List of student information: " + msg;
    
}

function clearArrayFunction () {
    nameArray.length = 0;
    firstTaskArray.length = 0;
    secondTaskArray.length = 0;
    nameAmount = 0;
    grade = 0;
    studyPoints = 0;
    outputElem.textContent = "Data has been deleted"
}