let mainContent = document.getElementById("main");
let eventsData = "data/FinlandEvents.json";
let eventArray = [];
let mapDivElem = document.getElementById("map");
let geocoder;
let myMap;

getData();


mapDivElem.addEventListener('change',resizeMap);

function getData() {
    fetch(eventsData)
        .then(function(response) {
            if (response.status !== 200) {
                // data transfer not complete
                return;
            }
            response.json().then(function(data) {
                    //handle each item in data
                    data.events.forEach(CreateDomElem);
                });
            })
        .catch(function(err) {
            console.log('Fetch Error :' + err);
    });
}


function CreateDomElem(item) {
   
    let eventInfo = {eventAddress: item.address, name: item.name};
    eventArray.push(eventInfo);
    console.log(eventArray);
    
    
    let newItem = document.createElement('div');
    newItem.setAttribute("class","row");
    console.log("item: " + item);
    let content = "";
	//content += '<div class="row">';
    content += '<div class="col-md-4 mb-4 text-center">';
    content += '<img class="imgLogo" src="images/' + item.picture + '">';
    content += '</div>';
    content += '<div class="col-md-8 mb-4">';
    content += '<blockquote class="blockquote">';
    content += '<h3>' + item.name + ' <small class="text-muted">' + item.date + '</small></h3>';
    content += '<p class="mb-0">' + item.description + '</p>';
    content += '<footer class="blockquote-footer">' + item.address + ', <a href="#map">Show on map</a></footer>';
    content += '</blockquote>';
    content += '</div>';
    //content += '</div>';
    
    newItem.innerHTML = content;
    
    mainContent.appendChild(newItem);
    if (eventArray.length >= 5 ) {
        showMap();
    }
    
}

function showMap() {
    geocoder = new google.maps.Geocoder();
    let lat_long = new google.maps.LatLng(61.49911, 23.78712);
			
	let mapOptions = {
						center:lat_long,
						zoom:6,
						mapTypeId:google.maps.MapTypeId.ROADMAP,
						mapTypeControl:false,
						navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL},
					};
	myMap = new google.maps.Map(mapDivElem,mapOptions);
    showEventmarkers();
}

function showEventmarkers() {
    //console.log(eventArray.length);
    for (let i = 0; i < eventArray.length; i++) {
        codeAddress();
        function codeAddress() { 
            console.log(eventArray[i].address);
            geocoder.geocode( { 'address': eventArray[i].eventAddress}, function(results, status) {
                if (status == 'OK') {
                    myMap.setCenter(results[0].geometry.location);
                    var marker = new google.maps.Marker({
                    map: myMap,
                    title: eventArray[i].name,
                    position: results[0].geometry.location
                });
                } else {
                console.log('Geocode was not successful for the following reason: ' + status);
              }
            });
          }
    }
    resizeMap();
        
}

//added an option to scroll down to the map
$(document).ready(function(){
  // Add smooth scrolling to all links
  $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
   
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});

/* doesnt work because the problem was within the CSS
function resizeMap() {
    google.maps.event.trigger(myMap,'resize');
    myMap.setZoom( myMap.getZoom() );
}
setInterval(resizeMap,1000)
function resizeMap() {
    //checkResize(myMap);
    google.maps.event.trigger(myMap, "resize");
}*/