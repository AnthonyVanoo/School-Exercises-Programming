let mapDivElem = document.getElementById("mapholder");
let busOption1 = document.getElementById("bus21");
let clearBtn = document.getElementById("clearButton");
let buses;
let busMarkers = [];
let numberOfCurrentBus = 0;
let currentBusIds = [];

clearBtn.addEventListener('click', clearAllMarkers);

let myMap;
/*
* make a class for each bus in the array
* class should include the marker array??
* bus ID
*/
/*
class bus {
    cunstructor(busMarker, busId) {
        this.busMarker = busMarker;
        this.busId = busId;
    }
    
}*/

//(on each update)

//Fetch data from json file
let staticData = "http://lissu-api.herokuapp.com/";

showGoogleMap();
setInterval(getData, 1500);
firstData();

function firstData() {
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
}

function getData() {
    fetch(staticData)
        .then(function(response) {
            if (response.status !== 200) {
                // data transfer not complete
                return;
            }
            response.json().then(function(data) {
                    //handle each item in the data, call a function using that data
                    data.vehicles.forEach(busInfoOrganizer);
                });
            })
        .catch(function(err) {
            console.log('Fetch Error :' + err);
    });
}

//create an array for each selected bus line
function initialBusData(thisBus) {
    let currentBusLocation = new google.maps.LatLng(thisBus.latitude,thisBus.longitude);
        if (thisBus.line.includes(busOption1.value)) {
            let myMarker = new google.maps.Marker({
                position: currentBusLocation,
                map:myMap,
                title: thisBus.line + " to " + thisBus.destination,
            });
            let thisMarker = {busMarker: myMarker, busId: thisBus.id};
            busMarkers.push(thisMarker);
            console.log(thisMarker);
        } 
}

function busInfoOrganizer(thisBus) {
    //console.log("Bus = " + thisBus.id);
    if (thisBus.line.includes(busOption1.value)) {
        //if blah exists update location
        for (let n = 0; n < busMarkers.length; n++ ) {
            if (thisBus.id == busMarkers[n].busId) {
                //??update location
                console.log(busMarkers[n].busId + " " + thisBus.id);
                busMarkers[n].busMarker.setPosition(new google.maps.LatLng(thisBus.latitude,thisBus.longitude));
                
            } else {
                
                let currentBusLocation = new google.maps.LatLng(thisBus.latitude,thisBus.longitude);

                let myMarker = new google.maps.Marker({
                    position: currentBusLocation,
                    map:myMap,
                    title: thisBus.line + " to " + thisBus.destination,
                });
                let thisMarker = {busMarker: myMarker, busId: thisBus.id};
                busMarkers.push(thisMarker);
                console.log(thisMarker);    
            }
        }
        
    }
}

/*display the map fuction*/
function showGoogleMap() {
		
	let lat_long = new google.maps.LatLng(61.49911, 23.78712);
			
	let mapOptions = {
						center:lat_long,
						zoom:16,
						mapTypeId:google.maps.MapTypeId.ROADMAP,
						mapTypeControl:false,
						navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL},
					};
	myMap = new google.maps.Map(mapDivElem,mapOptions);
}

function clearAllMarkers() {
    for (let n = 0; n < busMarkers.length; n++) {
        busMarkers[n].busMarker.setMap(null);
    }
    busMarkers.length = 0;
}
/*
function markerUpdate() {
    for (i in buses) {
       let currentBusLocation = new google.maps.LatLng(buses[i].latitude,buses[i].longitude);
	
	   let myMarker = new google.maps.Marker({
           position: currentBusLocation,
           map:myMap,
           title: buses[i].line,
       });
        busMarkers.push(myMarker);
    }
}*/

/*display marker function updates on an interval 1-2sec

if (selection options "bus line") {

            for loop through the ‘vehicles’ in the array and check whether the vechicle exists
            if it does update postion
            else create a new marker
            
            set current location {
                let mymarker at current location
                add details as an object(bus ID, line)
            }
            let currentLocation = new google.maps.LatLng(vegasPlaces[i].xloc,vegasPlaces[i].yloc);
	
               let myMarker = new google.maps.Marker({
                   position: currentLocation,
                   map:myMap,
                   title: vegasPlaces[i].displayName,
               });
                myMarkers.push(myMarker);
            }
            

    }
*/