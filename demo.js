/****************** GPS **************************/
var x = document.getElementById("p_geoloc");

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