const INITIALLAT = 61.49911;
const INITIALLNG = 23.78712;
const REFRESHTIMER = 120000;
const UPDATETIMER = 1500;

//coords of landmarks

let mapDivElem = document.getElementById("mapholder");
let curLocBtn = document.getElementById("currentLocationButton");
let showAllBtn = document.getElementById("showAllButton");
let clearBtn = document.getElementById("clearButton");
let buses;
let busMarkers = [];
let locationMarkers = [];
let busLineOptions= [];
let busUpdateInterval;

//add 1 beginning options for ref
busLineOptions[0] = "8";
let mediapolisLines = ["8", "17"];
let tamkLines = ["1", "5", "8", "28A", "28B", "28C", "28Y", "29", "80", "90"];
let universityLines = ["2", "6", "9A", "9B", "15", "28B", "40"];

curLocBtn.addEventListener('click', showCurrentLocation);
clearBtn.addEventListener('click', clearAllMarkers);

document.getElementById("showAllTamk").addEventListener('click', showBusesToTamk);
document.getElementById("showTamk").addEventListener('click', function(){showLandmark("Tamk");});
document.getElementById("showMediapolis").addEventListener('click', function(){showLandmark("Mediapolis");});

//Google Map Declarations
let myMap;

let staticData = "http://lissu-api.herokuapp.com/";

showGoogleMap();
initialData();
let busArrayRefresh = setInterval(initialData,REFRESHTIMER);

/*display the map fuction*/
function showGoogleMap() {
		
	let lat_long = new google.maps.LatLng(INITIALLAT, INITIALLNG);
			
	let mapOptions = {
						center:lat_long,
						zoom:12,
						mapTypeId:google.maps.MapTypeId.ROADMAP,
						mapTypeControl:false,
						navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL},
					};
	myMap = new google.maps.Map(mapDivElem,mapOptions);
}

//get the data for the first time to create the array
function initialData() {
    clearAllMarkers();
    fetch(staticData)
        .then(function(response) {
            if (response.status !== 200) {
                // data transfer not complete
                return;
            }
            response.json().then(function(data) {
                    //handle each item in the data, call a function using that data
                    data.vehicles.forEach(initialBusData);
                });
            })
        .catch(function(err) {
            console.log('Fetch Error :' + err);
    });
    let busUpdateInterval = setInterval(updateBusData, UPDATETIMER);
}

//have an interval that gets the data to then update the markers
function updateBusData() {
    
    fetch(staticData)
        .then(function(response) {
            if (response.status !== 200) {
                // data transfer not complete
                return;
            }
            response.json().then(function(data) {
                    //handle each item in the data, call a function using that data
                    data.vehicles.forEach(busLocationUpdater);
                });
            })
        .catch(function(err) {
            console.log('Fetch Error :' + err);
    });
}

//bus data passed to show all markers
function allBusData() {
    clearAllMarkers();
    fetch(staticData)
        .then(function(response) {
            if (response.status !== 200) {
                // data transfer not complete
                return;
            }
            response.json().then(function(data) {
                    //handle each item in the data, call a function using that data
                    data.vehicles.forEach(showAllBuses);
                });
            })
        .catch(function(err) {
            console.log('Fetch Error :' + err);
    });
    let busUpdateInterval = setInterval(updateBusData, UPDATETIMER);
}

//create an array for each selected bus line
function initialBusData(thisBus) {
    let currentBusLocation = new google.maps.LatLng(thisBus.latitude,thisBus.longitude);
    //let busIcon = 
        if (busLineOptions.includes(thisBus.line)) {
            let myMarker = new google.maps.Marker({
                position: currentBusLocation,
                icon: "img/busMarker8.png",//"img/busMarker" + thisBus.line + ".png",
                map:myMap,
                title: thisBus.line + " to " + thisBus.destination,
            });
            let thisMarker = {busMarker: myMarker, busId: thisBus.id};
            busMarkers.push(thisMarker);
            //alert("inTial" + busMarkers.length);
            //console.log(thisMarker);
        } 
}

function busLocationUpdater(thisBus) {
    //console.log("Bus = " + thisBus.id);
    if (busLineOptions.includes(thisBus.line)) {
        //console.log(busMarkers);
        //if this exists update location
        for (let n = 0; n < busMarkers.length; n++ ) {
            if (thisBus.id == busMarkers[n].busId) {
                
                //console.log(busMarkers[n].busId + " " + thisBus.id);
                busMarkers[n].busMarker.setPosition(new google.maps.LatLng(thisBus.latitude,thisBus.longitude));
                
            }
        }
        
    }
}

function showAllBuses(thisBus) {
    let currentBusLocation = new google.maps.LatLng(thisBus.latitude,thisBus.longitude);
    let myMarker = new google.maps.Marker({
        position: currentBusLocation,
        icon: "img/busMarker8.png",
        map: myMap,
        title: thisBus.line + " to " + thisBus.destination,
    });
    let thisMarker = {busMarker: myMarker, busId: thisBus.id};
    busMarkers.push(thisMarker);
    
}

//clears all current markers
function clearAllMarkers() {
    for (let n = 0; n < busMarkers.length; n++) {
        busMarkers[n].busMarker.setMap(null);
    }
    busMarkers.length = 0;
}

//display the user's current location
function showCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        alert("Geolocation is not supported by this browser.");
    }
    function showPosition(position) {
        let currentLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
        let myMarker = new google.maps.Marker({
            position: currentLocation,
            map:myMap,
            icon: "img/solaireMarkerSmNb.png",
            title: "Current Location",
        });
        locationMarkers.push(myMarker);
    }
}


//how the bus lines are selected/deselected
function lineBtnUpdate(clickedBtn) {
    let elemClass = "line" + clickedBtn;
    if (busLineOptions.includes(clickedBtn)) {
        //goes through all of the buttons and changes the style
        let buttonElems = document.getElementsByClassName(elemClass);
        for (let i = 0; i < buttonElems.length; i++) {
            buttonElems[i].classList.remove("btn-dark");
            buttonElems[i].classList.add("btn-light");
        } 
        busLineOptions = busLineOptions.filter(line => line !== clickedBtn);
        initialData();
    } else {
        let buttonElems = document.getElementsByClassName(elemClass);
        for (let i = 0; i < buttonElems.length; i++) {
            buttonElems[i].classList.add("btn-dark");
            buttonElems[i].classList.remove("btn-light");
        }
        busLineOptions.push(clickedBtn);
        
        //btnElem.classList.remove("btn-light");
        //btnElem.classList.add("btn-dark");
        initialData();
    }
    console.log(busLineOptions);
}

function showBusesToTamk() {
    //update the line buttons and markers and line options
}

function showLandmark(landmark) {
    //add a unique marker for Tamk
    alert("succes you didn't fail" + landmark);
}