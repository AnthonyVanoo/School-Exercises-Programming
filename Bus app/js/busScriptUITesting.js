const INITIALLAT = 61.49911;
const INITIALLNG = 23.78712;
const WHOLECITYZOOM = 12;
const LANDMARKZOOM = 14;
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
//might add this later let universityLines = ["2", "6", "9A", "9B", "15", "28B", "40"];
let allBusLines = ["1", "2", "3A", "3B", "4", "4Y", "5", "6", "8", "9A", "9B", "10", "11", "12", "14", "15", "17", "20", "20R", "21", "24", "25", "26", "28A", "28A", "28B", "28C", "28Y", "29", "31", "32", "33", "33Y", "34", "35", "37", "38", "40", "45", "50A", "50B", "50C", "55", "55K", "65N", "65X", "70", "71", "71K", "71SK", "72", "73", "73K", "74", "79", "80", "80Y", "81", "83", "84", "85", "90", "137"];

curLocBtn.addEventListener('click', showCurrentLocation);
clearBtn.addEventListener('click', clearAllMarkers);

//event listeners for UI
document.getElementById("showTamk").addEventListener('click', function(){showLandmark("Tamk");});
document.getElementById("showMediapolis").addEventListener('click', function(){showLandmark("Mediapolis");});
document.getElementById("showAllMediapolis").addEventListener('click', function(){locationLines("Mediapolis");});
document.getElementById("showAllTamk").addEventListener('click', function(){locationLines("Tamk");});

//Google Map Declarations
let myMap;
let geocoder = new google.maps.Geocoder();

let staticData = "http://lissu-api.herokuapp.com/";

showGoogleMap();
initialData();
let busArrayRefresh = setInterval(initialData,REFRESHTIMER);

/*display the map fuction*/
function showGoogleMap() {
		
	let lat_long = new google.maps.LatLng(INITIALLAT, INITIALLNG);
			
	let mapOptions = {
						center:lat_long,
						zoom:WHOLECITYZOOM,
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
    allBusLineBtnUpdater();
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

//displays all buses
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
        zoomMapIn(currentLocation);
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

function locationLines(location) {
    //update the line buttons and markers and line options
    if (location == "Tamk") {
        busLineOptions = tamkLines;
        console.log(busLineOptions);
        for (let i = 0; i < busLineOptions.length; i++) {
            let buttonElems = document.getElementsByClassName("line" + busLineOptions[i]);
            for (let i = 0; i < buttonElems.length; i++) {
                buttonElems[i].classList.add("btn-dark");
                buttonElems[i].classList.remove("btn-light");
            }
        }
        let btnLineSorter = allBusLines;
        for (let i = 0; i < busLineOptions.length; i++) {
            btnLineSorter = btnLineSorter.filter(line => line !== busLineOptions[i]);
        }
        for (let i = 0; i < btnLineSorter.length; i++) {
            let buttonElems = document.getElementsByClassName("line" + btnLineSorter[i]);
            for (let i = 0; i < buttonElems.length; i++) {
                buttonElems[i].classList.remove("btn-dark");
                buttonElems[i].classList.add("btn-light");
            }
        }
        console.log(btnLineSorter);
        initialData();
    } else {
        busLineOptions = mediapolisLines;
        console.log(busLineOptions);
        for (let i = 0; i < busLineOptions.length; i++) {
            let buttonElems = document.getElementsByClassName("line" + busLineOptions[i]);
            for (let i = 0; i < buttonElems.length; i++) {
                buttonElems[i].classList.add("btn-dark");
                buttonElems[i].classList.remove("btn-light");
            }
        }
        let btnLineSorter = allBusLines;
        for (let i = 0; i < busLineOptions.length; i++) {
            btnLineSorter = btnLineSorter.filter(line => line !== busLineOptions[i]);
        }
        for (let i = 0; i < btnLineSorter.length; i++) {
            let buttonElems = document.getElementsByClassName("line" + btnLineSorter[i]);
            for (let i = 0; i < buttonElems.length; i++) {
                buttonElems[i].classList.remove("btn-dark");
                buttonElems[i].classList.add("btn-light");
            }
        }
        initialData();
        
    }
    let locReset = new google.maps.LatLng(INITIALLAT, INITIALLNG);
    zoomMapOut(locReset);
}

function allBusLineBtnUpdater() {
    busLineOptions = allBusLines;
    for (let i = 0; i < busLineOptions.length; i++) {
        let buttonElems = document.getElementsByClassName("line" + busLineOptions[i]);
        for (let i = 0; i < buttonElems.length; i++) {
            buttonElems[i].classList.add("btn-dark");
            buttonElems[i].classList.remove("btn-light");
        }
    }
    initialData();
    let locReset = new google.maps.LatLng(INITIALLAT, INITIALLNG);
    zoomMapOut(locReset);
}

function showLandmark(landmark) {
    //add a unique marker for Tamk
    let address = landmark + ", Tampere, Finland";
	let addressLocation;
	let foundAddress = false;
	
	geocoder.geocode({'address':address}, function(results,status){
		 
		  if(status === google.maps.GeocoderStatus.OK){
              addressLocation = results[0].geometry.location;
              foundAddress = true;
			  let myMarker = new google.maps.Marker({
							position:addressLocation,
							map:myMap,
							title:landmark,
              });
              locationMarkers.push(myMarker);
			  zoomMapIn(addressLocation);
		  }
		  else {
              alert("Address was not found");
			  addressLocation = new google.maps.LatLng(INITIALLAT,INITIALLNG);
			  zoomMapOut(addressLocation);
		  }
	  });
}

function zoomMapIn(location) {
    myMap.panTo(location);
    myMap.setZoom(LANDMARKZOOM);
    myMap.setCenter(location);
}

function zoomMapOut(location) {
    myMap.panTo(location);
    myMap.setZoom(WHOLECITYZOOM);
    myMap.setCenter(location);
}