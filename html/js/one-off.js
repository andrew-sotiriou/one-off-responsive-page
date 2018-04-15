"use strict";

var vid = document.getElementById("bbb-vid"),
	currentVidRate = vid.playbackRate,
	displayRate = document.getElementById('current-speed'),
	subValue = 0.1,
	addValue = 1,
	displayGL = document.getElementById("geo-location"),
	dispMap = document.getElementById("map");


function displayVidRate(){
	displayRate.innerHTML = "Current Video Speed: " + currentVidRate;
}

function slowVidRate(){
	if (currentVidRate > 0){
		vid.playbackRate = (vid.playbackRate - subValue).toFixed(1);
		currentVidRate = vid.playbackRate;
		displayVidRate();
	}
	else{
		displayRate.innerHTML = "The video playback rate can't be below 0";
	}
}

function fasterVidRate(){
	vid.playbackRate = vid.playbackRate + addValue;
	currentVidRate = vid.playbackRate;
	displayVidRate();
}

function getLocation(){
	if (navigator.geolocation){
		navigator.geolocation.getCurrentPosition(displayGeo, geoError);
	} 
	else{ 
		displayGL.innerHTML = "Geolocation is not supported. Please try a new browser.";
	}
}

function displayGeo(position){
	displayGL.innerHTML = "Latitude: " + position.coords.latitude + " : " + "Longitude: " + position.coords.longitude;
    displayMap(position);
}

function displayMap(position){
	var latlon = { lat: position.coords.latitude, lng: position.coords.longitude };
	var map = new google.maps.Map(dispMap,{
		zoom: 15,
		center: latlon
	});
	var mapMarker = new google.maps.Marker({
		position: latlon,
		map: map
	});
	dispMap.classList.remove('hidden');
	dispMap.classList.add('active');
}

function geoError(error){
	switch(error.code){
		case error.PERMISSION_DENIED:
            displayGL.innerHTML = "You have denied the Geo Location request."
            break;
		case error.POSITION_UNAVAILABLE:
            displayGL.innerHTML = "Sorry, but your location is unavailable"
			break;
		case error.TIMEOUT:
            displayGL.innerHTML = "Sorry, but we ran out of time. Closing time!"
			break;
		case error.UNKNOWN_ERROR:
            displayGL.innerHTML = "Sorry, but something unknown has happened."
			break;       
	}
}

$(document).ready(function(){
	displayVidRate();
	$('#slower').on('click', slowVidRate);
	$('#faster').on('click', fasterVidRate);
	$('#location').on('click', getLocation);
});
