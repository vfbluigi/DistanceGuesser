var cityLatitude = 0;
var cityLongitude = 0;

var userLatitude = 0;
var userLongitude = 0;

var cities = [];

var locationUsable = false;

init();

/******************************************************/
function init(){
	getLocation();
	loadCities();
	getNewCity();
}

function loadCities() {
	var request = new XMLHttpRequest();  
	request.open("GET", "files/country-capitals.csv", false);   
	request.send(null);  

	cities = $.csv.toObjects(request.responseText);
	console.log(cities.length);
}

/******************************************************/

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getPosition, showError);
    } else { 
		locationUsable = false;
        document.getElementById("p_geoloc").innerHTML = "Geolocation is not supported by this browser.";
    }
}

function getPosition(position) {
	userLatitude = position.coords.latitude;
	userLongitude = position.coords.longitude;

	document.getElementById("p_geoloc").innerHTML = "Uses your location";
	locationUsable = true;
}

function showError(error) {

	var x = document.getElementById("p_geoloc");
	locationUsable = false;

    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}
/******************************************************/

function getNewCity() {

	var random = Math.floor(Math.random() * cities.length);

	var city = cities[random];

	document.getElementById("city").innerHTML = "How far is " + city.capital + " (" + city.country + ")?";
	cityLatitude = parseFloat(city.latitude);
	cityLongitude = parseFloat(city.longitude);

	document.getElementById("result_section").style.display = "none";
	document.getElementById("guess_input").value = "";
}



function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
	var R = 6371; // Radius of the earth in km
	var dLat = deg2rad(lat2-lat1);  // deg2rad below
	var dLon = deg2rad(lon2-lon1); 
	var a = 
		Math.sin(dLat/2) * Math.sin(dLat/2) +
		Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
		Math.sin(dLon/2) * Math.sin(dLon/2); 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c; // Distance in km
	return d;
}

function deg2rad(deg) {
	return deg * (Math.PI/180)
}


function guessDistance() {

	if (!locationUsable) {
		return;
	}

	var guess = parseFloat(document.getElementById("guess_input").value);

	if (!(guess > 0)) {
		return;
	}

	var actual = getDistanceFromLatLonInKm(userLatitude, userLongitude,
		cityLatitude, cityLongitude);

	var diff = Math.abs(guess - actual);

	showResult(actual, diff);
}

function showResult(actualDistance, diff) {

	ratio = diff / actualDistance;
	var color;

	if(ratio < 0.1) {
		color = "rgb(0,255,0)";
	} else if(ratio < 0.2) {
		color = "rgb(0,100,0)";
	} else if(ratio < 0.4) {
		color = "rgb(168,158,50)";
	} else if(ratio < 0.7) {
		color = "rgb(168,125,50)";
	} else if(ratio < 1) {
		color = "rgb(168,70,50)";
	} else {
		color = "rgb(255,0,0)";
	}

	document.getElementById("result_section").style.backgroundColor = color;
	document.getElementById("result_section").style.display = "flex";
	document.getElementById("distance").innerHTML = "Correct solution: " + actualDistance.toFixed(2) + "km </br>" + "Difference: " + diff.toFixed(2) + "km";
}



/* Viewport Breite */
jQuery(document).ready(function () { 
	
	//////////////////////////////////////////////////////
	// Aktuelle Viewport-Breite anzeigen
	//////////////////////////////////////////////////////
	
	// neues Element als erstes im Body-Tag einfuegen, DIV-Element mit Attributen und Eventhandler erzeugen
	$( "body" ).prepend($('<div/>', { 'id': 'js-viewport-breitenanzeiger', 'text': 'Viewport: ' + $(window).width()/parseFloat($("body").css("font-size")) + ' em'}));
	
	//////////////////////////////////////////////////////
	// Event-Handler (beim Aendern der Fenstergroesse 
	// Viewport-Daten in DIV-Element-Textknoten schreiben) 
	//////////////////////////////////////////////////////
	$( window ).resize(function() { 
		$('#js-viewport-breitenanzeiger').text("Viewport: " + $(window).width()/parseFloat($("body").css("font-size")) + "em");
	});

});	