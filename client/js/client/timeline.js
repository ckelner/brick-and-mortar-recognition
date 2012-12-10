//144px blocks... use this to advantage...
var scroll_start = {};
var scroll_dim = {};
var content_dim = {};
function setupTimeline(){
	var theDiv=$('#scrollTimeline');
	theDiv.draggable({ axis: "x"});
	/*var hammer=theDiv.hammer({
		prevent_default: false,
        drag_vertical: false
	});
	hammer.ondragstart=function(){
		scroll_start = getScrollPosition();
		scroll_start.time = new Date().getTime();
		scroll_dim = getDimensions(theDiv);
        content_dim = getDimensions(theDiv.children[0]);
	};
	hammer.ondrag=function(ev){
		if(ev.direction == 'left') {
			ev.distance = 0-ev.distance;
		}
		var delta = 1;
		var left = scroll_start.left + ev.distance * delta;
		theDiv.css({ left: left });
	};
	hammer.ondragend=function(ev){
		var scroll=getScrollPosition();
		var corrections={};
		if(scroll.left > 0) {
			corrections.left=0;
		}else if(scroll.left <-(content_dim.left - scroll_dim.left)) {
			corrections.left =-(content_dim.left - scroll_dim.left);
		}
		theDiv.animate(corrections, 400);
	};*/
	watchDraggable();
	centerTimelineOnCurrentHr();
}
/*function getScrollPosition(){
	return {
		top: parseInt($("#scrollTimeline").css('top'), 10),
		left: parseInt($("#scrollTimeline").css('left'), 10)
	};
}
function getDimensions(el){
	return{
		width: el.outerWidth(),
		height: el.outerHeight()
	};
}*/
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
// Chris Kelner - THIS BREAK FUCKING METEOR'S COOL SHIT (DB BINDING)
//for each hour in the day need to build out the guests in the view...
function loadGuestInView(){
	var todaysDate=moment().format('YYYY-MM-DD');
	var guestsCursor=Guests.find({"arrivaldate":todaysDate});
	var guestsByTimeArr=[[],[],[],[],[],[],[],[],[],
		[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
	//for(var i=0,guests=guestsArr.length; i<guests; i++){
	guestsCursor.forEach(function (guest){
		var time=guest.arrivaltime.substring(0,2);
		if(time.substring(0,1)==="0"){//trim leading 0
			time=time.substring(1,2);
		}
		time=time*1;//make a #
		guestsByTimeArr[time].push(guest);
	});
	var totalWidth=0;
	var totalHTML="";
	for(var x=0,guestyArr=guestsByTimeArr.length; x<guestyArr; x++){
		var insideHTML="";
		var beforeHTML="";
		var hr=x;
		if(hr<10){
			hr="0"+hr;
		}else{
			hr+="";
		}
		if(hr===moment().format('HH')){
			beforeHTML+='<div id="timelineGuestHour'+hr+'" class="centerText '+
				'timeLineGuestRow currentHour ';
		}else{
			beforeHTML+='<div id="timelineGuestHour'+hr+'" class="centerText '+
				'timeLineGuestRow ';
		}
		if(hr==="00"){
			beforeHTML+='zeroZero"';
		}else{
			beforeHTML+='"';
		}
		var widthCount=1;
		for(var i=0,gsts=guestsByTimeArr[x].length; i<gsts; i++){
			if(i%6===0){
				if(i>0){
					insideHTML+="</div>";
					widthCount++;
				}
				insideHTML+="<div class='guestTimelineWrapCol'>";
			}
			insideHTML+='<div class="guestTimelineEnclosure img-rounded"><div>';
			//mr, ms or none
			var sexy="<div class='guestTimelineName'>";
			if(guestsByTimeArr[x][i].sex==="m"){
				sexy+="Mr. ";
			}else if(guestsByTimeArr[x][i].sex==="f"){
				sexy+="Ms. ";
			}
			insideHTML+=sexy+guestsByTimeArr[x][i].lname+"</div></div>";
			insideHTML+='<div class="guestThumbEnclosure"><center>'+
				'<div class="guestThumbTimeline"><img src="';
			insideHTML+=guestsByTimeArr[x][i].img;
			insideHTML+='"class="img-rounded img-PadBottom"/></div></center>'+
				'</div></div>';
		}
		totalWidth+=(widthCount*144);
		if(guestsByTimeArr[x].length>=1){
			insideHTML+="</div>"
		}
		if(hr===moment().format('HH')){
			insideHTML+='<div id="timelineHour'+hr+'" class="centerText '+
				'rightBorderTimeRow currentHour" style="width:'+widthCount*144+'">';
		}else{
			insideHTML+='<div id="timelineHour'+hr+'" class="centerText '+
				'rightBorderTimeRow" style="width:'+widthCount*144+'px">';
		}
		insideHTML+=hr+":00</div></div>";
		beforeHTML+="style='width:"+widthCount*144+"px'>";
		totalHTML+=beforeHTML+insideHTML;
	}
	$("#scrollyMcScrolls").css("width",totalWidth*144);
	return totalHTML;
}