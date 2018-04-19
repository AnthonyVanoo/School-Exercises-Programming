let mapDivElem = document.getElementById("mapholder");
let clearBtn = document.getElementById("clearButton");
let buses;
let busMarkers = [];

clearBtn.addEventListener('click', clearAllMarkers);

let myMap;

//(on each update)

//Fetch data from json file
let staticData = "json/staticBusData.json";

showGoogleMap();
getData();

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
function busInfoOrganizer(thisBus) {
    console.log("Bus = " + thisBus.line);
    //buses = vehicle;
    //console.log(buses)
    //showGoogleMap();
    //markerUpdate();
    let currentBusLocation = new google.maps.LatLng(thisBus.latitude,thisBus.longitude);
	
	   let myMarker = new google.maps.Marker({
           position: currentBusLocation,
           map:myMap,
           title: thisBus.line + " to " + thisBus.destination,
       });
        busMarkers.push(myMarker);
}

/*display the map fuction*/
function showGoogleMap() {
		
	let lat_long = new google.maps.LatLng(61.49911, 23.78712);
			
	let mapOptions = {
						center:lat_long,
						zoom:14,
						mapTypeId:google.maps.MapTypeId.ROADMAP,
						mapTypeControl:false,
						navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL},
					};
	myMap = new google.maps.Map(mapDivElem,mapOptions);
}

function clearAllMarkers() {
    for (let n = 0; n < busMarkers.length; n++) {
        busMarkers[n].setMap(null);
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