var koeriLatitude = 49.011636;
var koeriLongitude = 8.416395;

var currentLatitude = 0;
var currentLongitude = 0;

//If this code is not in a define call,
//DO NOT use require('foo'), but use the async
//callback version:
fetch('files/de.json')
	.then(response => response.json())
	.then(json => console.log(json));


/****************** GPS **************************/
var x = document.getElementById("p_geoloc");

getLocation();

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude;	

	currentLatitude = position.coords.latitude;
	currentLongitude = position.coords.longitude;

	document.getElementById("distance").innerHTML = "distance: " + getDistanceFromLatLonInKm(position.coords.latitude, position.coords.longitude,
		koeriLatitude, koeriLongitude).toFixed(2) + "km";
}

function showError(error) {
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


function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
	var R = 6371; // Radius of the earth in km
	var dLat = deg2rad(lat2-lat1);  // deg2rad below
	var dLon = deg2rad(lon2-lon1); 
	var a = 
		Math.sin(dLat/2) * Math.sin(dLat/2) +
		Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
		Math.sin(dLon/2) * Math.sin(dLon/2)
		; 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c; // Distance in km
	return d;
}

function deg2rad(deg) {
	return deg * (Math.PI/180)
}


function guessDistance() {
	var guess = parseFloat(document.getElementById("guess").value);
	var actual = getDistanceFromLatLonInKm(currentLatitude, currentLongitude,
		koeriLatitude, koeriLongitude);

	var diff = Math.abs(guess - actual);

	showResult(actual, diff);
}

function showResult(actualDistance, diff) {

	ratio = diff / actualDistance;

	var expertise;
	var color;

	if(ratio < 0.01) {
		expertise = "EXPERT";
		color = "rgb(0,255,0)";
	} else if(ratio < 0.05) {
		expertise = "AWESOME";
		color = "rgb(0,100,0)";
	} else if(ratio < 0.1) {
		expertise = "GOOD";
		color = "rgb(100,170,100)";
	} else if(ratio < 0.2) {
		expertise = "ALRIGHT";
		color = "rgb(255,255,0)";
	} else if(ratio < 0.5) {
		expertise = "DO BETTER";
		color = "rgb(255,100,0)";
	} else {
		expertise = "DO YOUR GEOGRAPHY";
		color = "rgb(255,0,0)";
	}

	document.getElementById("expertise").innerHTML = expertise;
	document.getElementById("result_section").style.backgroundColor = color;
	document.getElementById("result_section").style.visibility = "visible";
	document.getElementById("distance").innerHTML = "Difference to solution: " + diff.toFixed(2) + "km \n (" + (ratio.toFixed(2)*100) + "%-deviation)";
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