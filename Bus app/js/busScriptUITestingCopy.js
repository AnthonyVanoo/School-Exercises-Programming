const INITIALLAT = 61.49911;
const INITIALLNG = 23.78712;
const REFRESHTIMER = 120000;
const UPDATETIMER = 1500;

let mapDivElem = document.getElementById("mapholder");
let curLocBtn = document.getElementById("currentLocationButton");
let showAllBtn = document.getElementById("showAllButton");
let clearBtn = document.getElementById("clearButton");
let buses;
let busMarkers = [];
let locationMarkers = [];
let busLineOptions= [];
let busUpdateInterval;

//add two options for ref
busLineOptions[0] = "8";
//busLineOptions[1] = "17";
/*let mediapolisLines = ["8", "17"];
let tamkLines = ["1", "5", "8", "28A", "28B", "28C", "28Y", "29", "80", "90"];
let universityLines = ["2", "6", "9A", "9B", "15", "28B", "40"];*/
//console.log(busLineOptions);

curLocBtn.addEventListener('click', showCurrentLocation);
clearBtn.addEventListener('click', clearAllMarkers);


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
        map:myMap,
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
        
        /* doesn't render in the correct spot let busIcon = {
            path: d="M13.352,27.155c0,0.485-0.393,0.879-0.88,0.879c-0.485,0-0.878-0.394-0.878-0.879c0-0.486,0.393-0.88,0.878-0.88 C12.958,26.275,13.352,26.669,13.352,27.155z M26.478,26.02c-0.487,0-0.88,0.394-0.88,0.877c0,0.487,0.394,0.88,0.88,0.88 c0.484,0,0.877-0.393,0.877-0.88C27.354,26.413,26.962,26.02,26.478,26.02z M30.44,24.122c-0.016,0.664-0.15,3.016-0.15,3.016 l-2.189-0.016c0,0,0.191-1.984-1.645-1.984c-1.717,0-1.678,1.935-1.678,1.935l-10.739-0.029c0,0,0.195-1.673-1.68-1.673 c-1.405,0-1.483,1.76-1.483,1.76L9.04,27.094c0,0-0.22-1.856-0.196-2.459c0.039-0.938,0-2.577,0.157-2.968 c0.144-0.359,4.413-0.281,4.413-0.281s-0.352-4.054-0.183-4.223c0.83-0.829,16.487-0.631,17.055-0.065 C30.597,17.41,30.481,22.289,30.44,24.122z M16,18.509c0-0.568-0.432-1.03-1-1.03c-0.57,0-1,0.461-1,1.03v4.637 c0,0.568,0.43,1.03,1,1.03c0.568,0,1-0.461,1-1.03V18.509z M20,18h-2v2h2V18z M23,18h-2v2h2V18z M26,18h-2v2h2V18z M29,18h-1.688v2 H29V18z",
            rotate: 0,
        };*/
        
        let currentLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
        //alert("Made it to showPos" + currentLocation);
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
function lineBtnUpdate(clickedBtn,btnType) {
    let elemId = "line" + clickedBtn;
    let elemId2 = "line" + clickedBtn + btnType;
    console.log(elemId);
    let btnElem = document.getElementById(elemId);
    if (busLineOptions.includes(clickedBtn)) {
        if (btnType == "Med") {
            document.getElementById(elemId2).classList.remove("btn-dark");
            document.getElementById(elemId2).classList.add("btn-light");
        } else if (btnType == "tamk") {
            document.getElementById(elemId2).classList.remove("btn-dark");
            document.getElementById(elemId2).classList.add("btn-light"); 
        }
        busLineOptions = busLineOptions.filter(line => line !== clickedBtn);
        btnElem.classList.remove("btn-dark");
        btnElem.classList.add("btn-light");
        initialData();
    } else {
        if (btnType == "Med") {
            document.getElementById(elemId2).classList.add("btn-dark");
            document.getElementById(elemId2).classList.remove("btn-light");
        } else if (btnType == "Tamk") {
            document.getElementById(elemId2).classList.add("btn-dark");
            document.getElementById(elemId2).classList.remove("btn-light");
        }
        busLineOptions.push(clickedBtn);
        console.log(busLineOptions);
        btnElem.classList.remove("btn-light");
        btnElem.classList.add("btn-dark");
        initialData();
    }
}
