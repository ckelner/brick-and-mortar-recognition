//144px blocks... use this to advantage...
var scroll_start = {};
var scroll_dim = {};
var content_dim = {};
function setupTimeline(){
	var theDiv=$('#scrollTimeline');
	theDiv.draggable({ axis: "x", distance: 10});
	watchDraggable();
	centerTimelineOnCurrentHr();
}
function watchDraggable(){
	$("#scrollTimeline").bind("dragstop",function(event, ui){
		var scrollyDiv=$('#scrollTimeline');
		if(scrollyDiv.is(':offscreen')){
			var divJ=$('#scrollTimeline');
			var width=calcRealWidthTimeline();
			//var width=divJ[0].offsetWidth;
			var left=divJ[0].offsetLeft;
			if(width+left<200){
				var curL=parseInt(scrollyDiv.css("left"));
				scrollyDiv.css("left", curL+(curL-(-width-200))+"px");
			}else{
				var curR=parseInt(scrollyDiv.css("left"));
				scrollyDiv.css("left", (curR-200)+"px");
			}
		}
	});
	$("#scrollTimeline").bind("drag",function(event,ui){
		$("#scrollTimeline").css("left", (ui.offset.left)+"px");
	});
}
function calcRealWidthTimeline(){
	var hrColDivs=$('#scrollTimeline')[0].children[0].children;
	var width=0;
	for(var i=0,colArrLen=hrColDivs.length; i<colArrLen; i++){
		width+=hrColDivs[i].offsetWidth;
	}
	return width;
}
function centerTimelineOnCurrentHr(newHr){
	var hr=(newHr)?newHr:global_Hours;
	var hrColDivs=$('#scrollTimeline')[0].children[0].children;
	//window width minus padding
	var ww=$('#scrollTimeline').parent().width()/2;
	var width=calcRealWidthTimeline();
	var offsetW=0;
	for(var i=hr,colArrLen=hrColDivs.length; i<colArrLen; i++){
		offsetW+=hrColDivs[i].offsetWidth;
	}
	// set up current time
	$('#scrollTimeline').css("left", (-1*(width)+(ww-144/2)+offsetW));
}
function touchHandler(event){
	var touches = event.changedTouches,
	first = touches[0],
	type = "";

	switch(event.type){
		case "touchstart": type = "mousedown"; break;
		case "touchmove":  type="mousemove"; break;
		case "touchend":   type="mouseup"; break;
		default: return;
	}
	var simulatedEvent = document.createEvent("MouseEvent");
	simulatedEvent.initMouseEvent(type, true, true, window, 1,
		first.screenX, first.screenY,
		first.clientX, first.clientY, false,
		false, false, false, 0/*left*/, null);

	first.target.dispatchEvent(simulatedEvent);
	event.preventDefault();
}
function touchInit(){
	document.addEventListener("touchstart", touchHandler, true);
	document.addEventListener("touchmove", touchHandler, true);
	document.addEventListener("touchend", touchHandler, true);
	document.addEventListener("touchcancel", touchHandler, true);    
}
