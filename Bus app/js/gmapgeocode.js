
const TAMKLAT = 61.5064004;
const TAMKLON = 23.6493113;

const INITIALZOOMLEVEL = 13;
const CLOSEUPLEVEL = 15;
const RECENTREINTERVAL = 1000;

let mapDivElem = document.getElementById("mapholder");
let addressElem = document.getElementById("addressField");
let postcodeElem = document.getElementById("postcodeField");
let cityElem = document.getElementById("cityField");

let button1Elem = document.getElementById("showLocationButton");
let allMarkers = new Array();
let geocoder = new google.maps.Geocoder();
let myMap;

button1Elem.addEventListener('click',getAndShowLocation);
showGoogleMap();

function showGoogleMap()
{	
	let lat_long = new google.maps.LatLng(TAMKLAT,TAMKLON);
			
	let mapOptions = {
						center:lat_long,
						zoom:INITIALZOOMLEVEL,
						mapTypeId:google.maps.MapTypeId.ROADMAP,
						mapTypeControl:false,
						navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL},
					};
	myMap = new google.maps.Map(mapDivElem,mapOptions);
	
   // display_status("position: " + lat_long);	
}
function getAndShowLocation(){
	let address = addressElem.value + "," + postcodeElem.value + "," + cityElem.value;
	let addressLocation;
	let foundAddress = false;
	
	geocoder.geocode({'address':address}, function(results,status){
		 
		  if(status === google.maps.GeocoderStatus.OK){
			//if(status == 'OK'){
			  addressLocation = results[0].geometry.location;
			  foundAddress = true;
			  let myMarker = new google.maps.Marker({
							position:addressLocation,
							map:myMap,
							title:addressElem.value,
						});
				allMarkers.push(myMarker);
			  recentreMap(addressLocation);
			  
			  display_status(" Geocode status: " + status + ", at " + addressLocation + ", (" + results.length + " results found)");
		  }
		  else {
			  //default marker position in city centre, needs further signpost
			  addressLocation = new google.maps.LatLng(TAMKLAT,TAMKLON);
			  recentreMap(addressLocation);
			  display_status(address + " not found");
		  }
	  });

}
function recentreMap(newLocation){
	    window.setTimeout(function() {
			myMap.panTo(newLocation);
			myMap.setZoom(CLOSEUPLEVEL);
			myMap.setCenter(newLocation);
    }, RECENTREINTERVAL);
}
function display_status(messagetoshow)
{
	let st_line = document.getElementById("status_line");
	st_line.firstChild.nodeValue = messagetoshow;
}