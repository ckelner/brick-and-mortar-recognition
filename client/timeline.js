//144px blocks... use this to advantage...
function setupTimeline(){
	global_userClockTime=global_Hours;
	$('#scrollTimeline').draggable({ axis: "x" });
	watchDraggable();
	//window width minus padding
	var ww=$('#scrollTimeline').parent().parent().width()/2;
	// set up current time
	$('#scrollTimeline').css("left", -1*global_userClockTime*144+ww);
	//debug
	console.log(ww);
}

function watchDraggable(){
	$("#scrollTimeline").bind("dragstop",function(event, ui){
		//alert("worked");
	});
}