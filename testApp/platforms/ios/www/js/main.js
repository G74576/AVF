//Kevin O'Toole
//AVF 1398
//JavaScript Template

// Instagram API Functions
$('form #searchbtn').on('click', function(){
	$.mobile.changePage("#igapi", {});
	$('#data-output').empty();
	var tag = $('#search').val();
	var url = 'https://api.instagram.com/v1/tags/'+ tag +
				'/media/recent?callback=?&amp;client_id=be8e93cc3ab4436bbcc58ad345e6e798';
	$.getJSON(url, results);
});


// Function puts search results into a list -- use css to customize the list
var results = function(info){
	console.log(info);
	
	$.each(info.data, function(index, photo){
		var pic = "<li><a href='" + photo.images.standard_resolution.url + "' target='_blank'><img src='" + photo.images.standard_resolution.url +
					"'alt='" + photo.user.id + "' /></a></li>";
		$("#data-output").append(pic);
	});
};

// Flickr API Functions
$('form #flsearchbtn').on('click', function(){
	$.mobile.changePage("#flickr", {});
	$('#fldata-output').empty();
	var fltag = $('#flsearch').val();
	var flurl = "http://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=79682155523ba2d9b864321da105b8fa&tags="
				 + fltag + "&format=json&jsoncallback=?&per_page=20";
	$.getJSON(flurl, flresults);
});

var flresults = function(finfo){
	console.log(finfo)
	
	$.each(finfo.photos.photo, function(index, fphoto){
		var flimage = "http://farm" + fphoto.farm + ".static.flickr.com/" + fphoto.server + "/" + fphoto.id + "_" + fphoto.secret + ".jpg";
		var flpic = "<li><a href='" + flimage + "' target='_blank'><img src='" + flimage + "'alt='" + fphoto.id + "' /></a></li>";
		$("#fldata-output").append(flpic);
	});
};

//These functions will not run until device is ready

var onDeviceReady = function(){
	$('#camerabtn').bind('tap', cameraFn);
	$("#geobtn").on("click", geoFn);
	$("#compassbtn").on("click", compFn);
	$("#connbtn").on("click", connFn);
};

// Camera Function
var cameraFn = function(){
	navigator.camera.getPicture(onSuccess, onFail, {
		quality: 50, destinationType: Camera.DestinationType.FILE_URI, sourceType: Camera.PictureSourceType.CAMERA
	});
};

// Geolocation Function
var geoFn = function(){
	navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoFail, {enableHighAccuracy: true});
};

// Compass Function
var compFn = function(){
	navigator.compass.getCurrentHeading(onCompSuccess, onCompFail);
};

// Connection Type Function
var connFn = function(){
	var connectionState = navigator.network.connection.type;
	var status = {};
		status[Connection.UNKNOWN]  = 'Unknown connection';
        status[Connection.ETHERNET] = 'Ethernet connection';
        status[Connection.WIFI]     = 'WiFi connection';
        status[Connection.CELL_2G]  = 'Cell 2G connection';
        status[Connection.CELL_3G]  = 'Cell 3G connection';
        status[Connection.CELL_4G]  = 'Cell 4G connection';
        status[Connection.NONE]     = 'No network connection';
	$("#type").append("Your connection type is: " + status[connectionState]);
};

var onSuccess = function(imageURI){
	$("#cameraImage").attr("src", imageURI);
	$("#cameraImage").css("display", "block");
};
var onFail = function(message){
	alert('Failed Because:' + message);
};

var onCompSuccess = function(heading){
	alert("Heading: " + heading.magneticHeading);
};

var onCompFail = function(compassError){
	alert("Compass Error: " + compassError.code);
};

var onGeoSuccess = function(position){
	alert("Get current location!")
	var lat = position.coords.latitude;
	var lon = position.coords.longitude;
	var map = '<p>' + 'Latitude: ' + lat + '<br/>' + 'Longitude: ' + lon + '</p><br/>' + 
				'<img class="map" src="http://maps.googleapis.com/maps/api/staticmap?center=' 
				+ lat + ',' + lon + '&zoom=13&size=600x300&maptype=roadmap&markers=color:red%7Clabel:S%7C' 
				+ lat + ',' + lon + '&sensor=true" />';
	$("#geoMap").append(map);
};

var onGeoFail = function(error){
	if(error == 1){
		altert("Turn on geolocation services");
	}
};

document.addEventListener('deviceready', onDeviceReady, false);