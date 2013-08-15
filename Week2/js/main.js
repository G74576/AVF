//Kevin O'Toole
//AVF 1398
//JavaScript Template

$('#launchpage').on('pageinit', function(){
	
});

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
