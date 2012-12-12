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
		makeSureStayOnScreen();
	});
	$("#scrollTimeline").bind("drag",function(event,ui){
		$("#scrollTimeline").css("left", (ui.offset.left)+"px");
	});
}
function makeSureStayOnScreen(){
	var scrollyDiv=$('#scrollTimeline');
	if(scrollyDiv.is(':offscreen')){
		var width=calcRealWidthTimeline();
		var diffLen=$('#scrollTimeline')[0].children[0].children.length;
		var diff=$('#scrollTimeline')[0].children[0].children[diffLen-1].offsetWidth;
		width-=diff;
		//var width=divJ[0].offsetWidth;
		var left=scrollyDiv[0].offsetLeft;
		if(width+left<200){
			var curL=parseInt(scrollyDiv.css("left"));
			scrollyDiv.css("left", curL+(curL-(-width-200))+"px");
		}else{
			var curR=parseInt(scrollyDiv.css("left"));
			scrollyDiv.css("left", (curR-200)+"px");
		}
	}
}
function calcRealWidthTimeline(){
	var hrColDivs=$('#scrollTimeline')[0].children[0].children;
	var width=0;
	// minus 1 because of modals
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
/*
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
		false, false, false, 0, null);

	first.target.dispatchEvent(simulatedEvent);
	event.preventDefault();
}
*/
function touchInit(){
	//document.addEventListener("touchstart", touchHandler, true);
	//document.addEventListener("touchmove", touchHandler, true);
	//document.addEventListener("touchend", touchHandler, true);
	//document.addEventListener("touchcancel", touchHandler, true);
	var el = $("body")[0];
    var tapTap = new Tap(el);
	el.addEventListener('tap', tapDidOccur, false); 
}
function tapDidOccur(e){
    e.target.click();
}
function timelineMoveLeft(){
	var val=$("#scrollTimeline").css("left");
	val=parseInt(val.substring(0,val.length-2));
	val+=150;
	$("#scrollTimeline").css("left",val+"px");
	makeSureStayOnScreen();
}
function timelineMoveRight(){
	var val=$("#scrollTimeline").css("left");
	val=parseInt(val.substring(0,val.length-2));
	val-=150;
	$("#scrollTimeline").css("left",val+"px");
	makeSureStayOnScreen();
}
