//144px blocks... use this to advantage...
function setupTimeline(){
	global_userClockTime=global_Hours;
	$('#scrollTimeline').draggable({ axis: "x" });
	watchDraggable();
	//window width minus padding
	var ww=$('#scrollTimeline').parent().width()/2;
	// set up current time
	// not sure why 148.5 works well...
	$('#scrollTimeline').css("left", -1*global_userClockTime*148.5+ww);
	//debug
	//console.log(ww);
}

function watchDraggable(){
	$("#scrollTimeline").bind("dragstop",function(event, ui){
		//alert("worked");
	});
}