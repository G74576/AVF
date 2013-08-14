//Kevin O'Toole
//AVF 1398
//JavaScript Template

$('#launchpage').on('pageinit', function(){
	
});

// Instagram API Functions
$('#igapi').on('pageinit', function(){
	$('form #searchbtn').on('click', function(){
		$.mobile.changePage("#igapi", {});
		$('#data-output').empty();
		var tag = $('#search').val();
		var url = 'https://api.instagram.com/v1/tags/'+ tag +
					'/media/recent?callback=?&amp;client_id=be8e93cc3ab4436bbcc58ad345e6e798';
		$.getJSON(url, results);
	});
});

// Function puts search results into a list -- use css to customize the list
var results = function(info){
	console.log(info);
	
	$.each(info.data, function(index, photo){
		var pic = "<li><img src='" + photo.images.standard_resolution.url +
					"'alt='" + photo.user.id + "' /><h4>" + photo.user.full_name +
					", <em>(" + photo.user.username +")</em></h4></li>";
		$("#data-output").append(pic);
	});
};