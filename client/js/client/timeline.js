//144px blocks... use this to advantage...
function setupTimeline(){
	global_userClockTime=global_Hours;
	$('#scrollTimeline').draggable({ axis: "x" });
	watchDraggable();
	//window width minus padding
	var ww=$('#scrollTimeline').parent().width()/2;
	// set up current time
	$('#scrollTimeline').css("left", (-1*((global_userClockTime)*144)+(ww-144/2)-20));
}
function watchDraggable(){
	$("#scrollTimeline").bind("dragstop",function(event, ui){
		//alert("worked");
	});
}