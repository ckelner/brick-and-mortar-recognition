//145px blocks... use this to advantage...
function setupTimeline(){
	global_userClockTime=global_Hours;
	$('#scrollTimeline').draggable({ axis: "x" });
	watchDraggable();
	// set up current time
	$('#scrollTimeline').css("left", -1*global_userClockTime*145);
}

function watchDraggable(){
	$("#scrollTimeline").bind("dragstop",function(event, ui){
		//alert("worked");
	});
}