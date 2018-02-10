/* variables for text changes */
let studentImg = document.getElementById("studentImage");
let studentName = document.getElementById("studentName");
let studentDOB = document.getElementById("studentDOB");
let studentTown = document.getElementById("studentHome");

let studentStatus = document.getElementById("studentStatus");
let gradeAndCr = document.getElementById("gradeAndCr");

let taskInfo = document.getElementById("taskInfo");

let studentOrder = document.getElementById("studentOrder");

/* Variables for buttons */
let progressBtn = document.getElementById("showProgress");
let task1Btn = document.getElementById("task1Button");
let task2Btn = document.getElementById("task2Button");
let prevBtn = document.getElementById("previousStudent");
let nextBtn = document.getElementById("nextStudent");

/* Variables for input 
* in the functions where they are needed
let firstTask = parseFloat(document.getElementById("task1Input").value);
let secondTask = parseFloat(document.getElementById("task2Input").value);*/


/* class for student information */
class Student {
    constructor (image,fullName,dateOfBirth,town,task1,task2,average,grade,credits){
        this.image = image;
        this.fullName = fullName;
        this.dateOfBirth = dateOfBirth;
        this.town = town;
        this.task1 = 0;
        this.task2 = 0;
        this.average = 0;
        this.grade = 0;
        this.credits = 0;
        this.firstTaskCount = 0;
        this.secondTaskCount = 0;
    }
    /* function for when both tasks are set then set the average grade and credits amounts */
    updateAGC() {
        if ((this.firstTaskCount == 1) && (this.secondTaskCount == 1)) {
            this.average = (this.task1 + this.task2) / 2;
            if (this.average >= 40 ) {
            this.credits = 5;
            }
            if (this.average < 40) {
                this.credits = 0;
                this.grade = 0;
            }
            if ( (this.average >= 40) || (this.average >= 44)) {
                this.grade = 1;
            }
            if ( (this.average >= 45) || (this.average >= 54)) {
                this.grade = 2;
            }
            if ( (this.average >= 55) || (this.average >= 64)) {
                this.grade = 3;
            }
            if ( (this.average >= 65) || (this.average >= 74)) {
                this.grade = 4;
            }
            if (this.average >= 75) {
                this.grade = 5;
            }
        }
    }
    
    
    
}

/*  add an array and a count for first student */
let studentArray = new Array();
let currentStudent = 0;

studentArray[0] = new Student("images/jeff.jpg","Jeff Berthil","18.05.1996","Newshire, Clement",0,0,0,0,0);
studentArray[1] = new Student("images/bill.jpg","Bill Tougan","18.05.1996","Newshire, Clement",0,0,0,0,0);
studentArray[2] = new Student("images/jessica.jpg","Jessica Biltur","18.05.1996","Weston, Clement",0,0,0,0,0);
studentArray[3] = new Student("images/mike.jpg","Mike Claton","18.12.1996","Harkon, Blentor",0,0,0,0,0);
studentArray[4] = new Student("images/sarah.jpg","Sarah Wessen","08.08.2000","Harkon, Blentor",0,0,0,0,0);

/* instant function for display of the first student */
showStudent(studentArray[currentStudent]);

/* Add event listeners 
* add after the studentArray because it uses that array
* couldnt feed info properly using progressBtn.addEventListener('click', updateProgress(studentArray[currentStudent]));
*/
progressBtn.addEventListener('click', updateProgress);
task1Btn.addEventListener('click', addTask1);
task2Btn.addEventListener('click', addTask2);
prevBtn.addEventListener('click', prevStudent);
nextBtn.addEventListener('click', nextStudent);

function showStudent(sdt) {
    studentImg.src = sdt.image;
    studentName.textContent = sdt.fullName;
    studentDOB.innerHTML = "Date of Birth:" + "<br>" + sdt.dateOfBirth;
    studentTown.innerHTML = "Town:" + "<br>" + sdt.town;
    console.log(sdt);
}
/* add function to show progress 
*could feed info in properly made a more basic one
*/
/*function updateProgress(sdt) {
    alert("this function ran");
    if ((sdt.firstTaskCount == 0) || (sdt.secondTaskCount == 0) ) {
        if (sdt.firstTaskCount == 0) {
            studentStatus.textContent = "First task is not complete. ";
            gradeAndCr.textContent = "";
        }
        if (sdt.secondTaskCount == 0 ){
            studentStatus.textContent += "Second task is not complete";
            gradeAndCr.textContent = "";
        }
    }
}*/
function updateProgress() {
    //testing alert("this function ran");
    studentArray[currentStudent].updateAGC();
    if (studentArray[currentStudent].firstTaskCount == 0) {
        studentStatus.textContent = "First task is not complete. ";
        gradeAndCr.textContent = "";
    }
    if (studentArray[currentStudent].secondTaskCount == 0 ){
        studentStatus.textContent += "Second task is not complete.";
        gradeAndCr.textContent = "";
    }
    if ((studentArray[currentStudent].firstTaskCount == 1) && (studentArray[currentStudent].secondTaskCount == 0)) {
        studentStatus.textContent = "First task is complete. ";
        gradeAndCr.textContent = "First task had a score of " + studentArray[currentStudent].task1 + "%. Need to complete both task for grade and credits.";
    }
    if ((studentArray[currentStudent].firstTaskCount == 0) && (studentArray[currentStudent].secondTaskCount == 1)) {
        studentStatus.textContent = "second task is complete. ";
        gradeAndCr.textContent = "Second task had a score of " + studentArray[currentStudent].task2 + "%. Need to complete both task for grade and credits.";
    }
    if ((studentArray[currentStudent].firstTaskCount == 1) && (studentArray[currentStudent].secondTaskCount == 1)) {
        studentStatus.textContent = "Both tasks are completed. ";
        gradeAndCr.textContent = "First task: " + studentArray[currentStudent].task1 + "%, second task: " + studentArray[currentStudent].task2 + "%. Got an average of: " + studentArray[currentStudent].average + "%. Grade: " + studentArray[currentStudent].grade + ", Credits: " + studentArray[currentStudent].credits;
    }
}

/* function for both task buttons */
function addTask1 () {
    let firstTask = parseFloat(document.getElementById("task1Input").value);
    if (( firstTask >= 0) && (firstTask <= 100)) {
        //testing alert(firstTask.value);
        if (studentArray[currentStudent].firstTaskCount == 0) {
            studentArray[currentStudent].task1 = firstTask;
            studentArray[currentStudent].firstTaskCount++;
            taskInfo.textContent = "First task updated.";
        } else {
            taskInfo.textContent = studentArray[currentStudent].fullName + " has already completed the first task.";
        }
    } else {
        taskInfo.textContent = "Task's value needs to be a number between 0 - 100";
    }
}

function addTask2 () {
    let secondTask = parseFloat(document.getElementById("task2Input").value);
    if ((secondTask >= 0) && (secondTask <= 100)) {
        //testing alert(secondTask.value);
        if (studentArray[currentStudent].secondTaskCount == 0) {
            studentArray[currentStudent].task2 = secondTask;
            studentArray[currentStudent].secondTaskCount++;
            taskInfo.textContent = "Second task updated."
        } else {
            taskInfo.textContent = studentArray[currentStudent].fullName + " has already completed the second task.";
        }
    } else {
        taskInfo.textContent = "Task's value needs to be a number between 0 - 100";
    }
}

/* add functions to switch between students */
function prevStudent() {
    if(currentStudent > 0){
		currentStudent -= 1;
		showStudent(studentArray[currentStudent]);
        studentOrder.textContent = "Student " + (currentStudent + 1) + " of " + studentArray.length;
        /* reset the text of the page when you switch to new student */
        studentStatus.textContent = "Click to show student's progress.";
        gradeAndCr.textContent = "";
        taskInfo.textContent = "";
        let firstTask = document.getElementById("task1Input");
        firstTask.value = "";
        let secondTask = document.getElementById("task2Input");
        secondTask.value = "";
	}
}

function nextStudent() {
    if(currentStudent < (studentArray.length - 1)){
		currentStudent += 1;
		showStudent(studentArray[currentStudent]);
        studentOrder.textContent = "Student " + (currentStudent + 1) + " of " + studentArray.length;
        /* reset the text of the page when you switch to new student */
        studentStatus.textContent = "Click to show student's progress.";
        gradeAndCr.textContent = "";
        taskInfo.textContent = "";
        let firstTask = document.getElementById("task1Input");
        firstTask.value = "";
        let secondTask = document.getElementById("task2Input");
        secondTask.value = "";
        
        
	}
}