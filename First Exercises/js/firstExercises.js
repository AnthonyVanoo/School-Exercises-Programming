let nameInput = document.getElementById("inputField");
let nameButton = document.getElementById("inputButton");
let nameDisplay = document.getElementById("greetingDisplay");

nameButton.addEventListener("click", displayGreeting);

function displayGreeting() {
    nameDisplay.textContent = "Hello, " + nameInput.value + "!"
}

//time and date

//Declaring Variables
let timeBtn = document.getElementById("timeButton");
let dateBtn = document.getElementById("dateButton");
let timeAndDateDisplay = document.getElementById("timeDateDisplay")

let weekdayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
let weekdayFinnish = ["Sunnuntai", "Maanantai", "Tiistai", "Keskiviikko", "Torstai", "Perjantai", "Lauantai"];
let monthsFinnish = ["Tammikuuta", "Helmikuuta", "Maaliskuuta", "Huhtikuuta", "Toukokuuta", "Kesäkuuta", "Heinäkuuta", "Elokuuta", "Syyskuuta", "Lokakuuta", "Marraskuuta", "Joulukuuta" ];

timeBtn.addEventListener('click', displayTime);
dateBtn.addEventListener('click', displayDate);
//debugging alert(languageChoice);

function displayTime() {
    let languageChoice = document.getElementById('languageSelection').value;
    let timeAndDateNow = new Date();
    let hours = timeAndDateNow.getHours();
    let minutes = timeAndDateNow.getMinutes();
    let seconds = timeAndDateNow.getSeconds();
    if (languageChoice === "English" ) {
    timeAndDateDisplay.textContent = "Current time is: " + hours + ":" + minutes + ":" + seconds;
    } else {
        timeAndDateDisplay.textContent = "Kello on nyt: " + hours + ":" + minutes + ":" + seconds;
    }
}

function displayDate() {
    let languageChoice = document.getElementById('languageSelection').value;
    let timeAndDateNow = new Date();
    let day = timeAndDateNow.getDay();
    let dayNumber = timeAndDateNow.getDate();
    let month = timeAndDateNow.getMonth();
    let year = timeAndDateNow.getFullYear();
    if ( languageChoice === "English" ){
        timeAndDateDisplay.textContent = "Current date is: " + weekdayArray[day] + " " + dayNumber + ", " + monthsArray[month] + ", " + year;
    } else {
        timeAndDateDisplay.textContent = "Päivämäärä on: " + weekdayFinnish[day] + " " + dayNumber + ". " + monthsFinnish[month] + ", " + year;
    }
    
   }
//bmi stuff

let displayBMI = document.getElementById("bmiDisplay");
let bmiBtn = document.getElementById("bmiButton");

bmiBtn.addEventListener('click', bmiFunction);

function bmiFunction() {
    let height = parseFloat(document.getElementById("userHeight").value);
    let weight = parseFloat(document.getElementById("userWeight").value);
    //Makes sure user input is a number
    if ( (isNaN(height)) || (isNaN(weight))) {
        displayBMI.textContent = "Both values need to be a NUMBER greater than 0";
    } else {
        let bmiResult = (weight/height) / height;
        if (bmiResult < 18.5) {
           displayBMI.textContent = "With a weight of " + weight + " kilograms and a height of " + height + " meters, your BMI is: " + bmiResult.toPrecision(4) + " (Underweight)"; 
        }
        if ((bmiResult >= 18.5) && (bmiResult < 25)) {
           displayBMI.textContent = "With a weight of " + weight + " kilograms and a height of " + height + " meters, your BMI is: " + bmiResult.toPrecision(4) + " (Normal weight)"; 
        }
        if ((bmiResult >= 25) && (bmiResult < 30)) {
           displayBMI.textContent = "With a weight of " + weight + " kilograms and a height of " + height + " meters, your BMI is: " + bmiResult.toPrecision(4) + " (Overweight)"; 
        }
        if (bmiResult >= 30) {
           displayBMI.textContent = "With a weight of " + weight + " kilograms and a height of " + height + " meters, your BMI is: " + bmiResult.toPrecision(4) + " (Obese)"; 
        }
    /*displayBMI.textContent = "BMI is: " + bmiResult.toPrecision(4);*/
    }
}

// style functions
let hiddenContent = document.getElementById('demoCode');
hiddenContent.style.display='none';

let hiddenCntTwo = document.getElementById('tdCode');
hiddenCntTwo.style.display='none';

let hiddenCntThree = document.getElementById('bmiCode');
hiddenCntThree.style.display='none';

function hideShow () {
    let x = document.getElementById("demoCode");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
}

function hideShowTwo () {
    let x = document.getElementById("tdCode");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
}

function hideShowThree () {
    let x = document.getElementById("bmiCode");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
}