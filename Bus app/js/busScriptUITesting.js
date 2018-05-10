let mapDivElem = document.getElementById("mapholder");
let busLineOptions= [];
//let clearBtn = document.getElementById("clearButton");
let buses;
let busMarkers = [];
let numberOfCurrentBus = 0;
let currentBusIds = [];
let busUpdateInterval;

//add two options for ref
busLineOptions[0] = "17";
busLineOptions[1] = "21";
console.log(busLineOptions);
//clearBtn.addEventListener('click', clearAllMarkers);

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
let staticData = "json/staticBusData.json";

showGoogleMap();
firstData();
let busArrayRefresh = setInterval(firstData,120000);

//get the data for the first time to create the array
function firstData() {
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
    let busUpdateInterval = setInterval(getData, 1500);
}

//have an interval that gets the data to then update the markers
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
        if (busLineOptions.includes(thisBus.line)) {
            let myMarker = new google.maps.Marker({
                position: currentBusLocation,
                map:myMap,
                title: thisBus.line + " to " + thisBus.destination,
            });
            let thisMarker = {busMarker: myMarker, busId: thisBus.id};
            busMarkers.push(thisMarker);
            //alert("inTial" + busMarkers.length);
            //console.log(thisMarker);
        } 
}

function busInfoOrganizer(thisBus) {
    //console.log("Bus = " + thisBus.id);
    if (busLineOptions.includes(thisBus.line)) {
        //console.log(busMarkers);
        //console.log("Text");
        //if these exists update location
        
        for (let n = 0; n < busMarkers.length; n++ ) {
            if (thisBus.id == busMarkers[n].busId) {
                //??update location
                //console.log(busMarkers[n].busId + " " + thisBus.id);
                busMarkers[n].busMarker.setPosition(new google.maps.LatLng(thisBus.latitude,thisBus.longitude));
                
            }
        }
        
    }
}

/*display the map fuction*/
function showGoogleMap() {
		
	let lat_long = new google.maps.LatLng(61.49911, 23.78712);
			
	let mapOptions = {
						center:lat_long,
						zoom:10,
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