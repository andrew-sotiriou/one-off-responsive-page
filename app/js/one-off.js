"use strict";

var vid = document.getElementById("bbb-vid"),
	currentVidRate = vid.playbackRate,
	displayRate = document.getElementById('current-speed'),
	subValue = 0.1,
	addValue = 1;


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

$(document).ready(function(){
	displayVidRate();

	$('#slower').on('click', slowVidRate);
	$('#faster').on('click', fasterVidRate);
});




