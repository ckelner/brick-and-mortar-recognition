//144px blocks... use this to advantage...
function setupTimeline(){
	$('#scrollTimeline').draggable({ axis: "x" });
	watchDraggable();
	centerTimelineOnCurrentHr();
}
function watchDraggable(){
	$("#scrollTimeline").bind("dragstop",function(event, ui){
		//alert("worked");
	});
}
function centerTimelineOnCurrentHr(newHr){
	var hr=(newHr)?newHr:global_Hours;
	//window width minus padding
	var ww=$('#scrollTimeline').parent().width()/2;
	// set up current time
	$('#scrollTimeline').css("left", (-1*((hr)*144)+(ww-144/2)-20));
}
