//144px blocks... use this to advantage...
var scroll_start = {};
var scroll_dim = {};
var content_dim = {};
function setupTimeline(){
	var theDiv=$('#scrollTimeline');
	theDiv.draggable({ axis: "x", distance: 10});
	watchDraggable();
	centerTimelineOnCurrentHr();
	watchForChange();
}
function watchDraggable(){
	$("#scrollTimeline").bind("dragstop",function(event, ui){
		makeSureStayOnScreen();
	});
	$("#scrollTimeline").bind("drag",function(event,ui){
		$("#scrollTimeline").css("left", (ui.offset.left)+"px");
	});
}
function slowLoad(){
	var frag=Meteor.render(function(){
		var todaysDate=moment().format('YYYY-MM-DD');
		var guestsCursor=Guests.find({"arrivaldate":todaysDate});
		var guestsByTimeArr=[[],[],[],[],[],[],[],[],[],
			[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
		var guestsByTimeArrTemp=[[],[],[],[],[],[],[],[],[],
			[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
		guestsCursor.forEach(function(guest){
			var time=guest.arrivaltime.substring(0,2);
			if(time.substring(0,1)==="0"){//trim leading 0
				time=time.substring(1,2);
			}
			time=time*1;//make a #
			guestsByTimeArrTemp[time].push(guest);
		});
		// sort guests
		for(var q=0,guestyArr=guestsByTimeArrTemp.length; q<guestyArr; q++){
			var royalAs=[];
			var regAs=[];
			var platGs=[];
			var goldGs=[];
			var clubGs=[];
			var plainGs=[];
			for(var p=0,gsts=guestsByTimeArrTemp[q].length; p<gsts; p++){
				/*
					<option>Not a member</option>
					<option>Club</option>
					<option>Gold</option>
					<option>Platinum</option>
					<option>Ambassador</option>
					<option>Royal Ambassador</option>
				*/
				switch(guestsByTimeArrTemp[q][p].pcrStatus.toLowerCase()){
					case "royal ambassador":
						royalAs.push(guestsByTimeArrTemp[q][p]);
					break;
					case "ambassador":
						regAs.push(guestsByTimeArrTemp[q][p]);
					break;
					case "platinum":
						platGs.push(guestsByTimeArrTemp[q][p]);
					break;
					case "gold":
						goldGs.push(guestsByTimeArrTemp[q][p]);
					break;
					case "club":
						clubGs.push(guestsByTimeArrTemp[q][p]);
					break;
					case "not a member":
						plainGs.push(guestsByTimeArrTemp[q][p]);
					break;
				}
			}
			for(var z=0,arrLen=royalAs.length; z<arrLen; z++){
				guestsByTimeArr[q].push(royalAs[z]);
			}
			for(var z=0,arrLen=regAs.length; z<arrLen; z++){
				guestsByTimeArr[q].push(regAs[z]);
			}
			for(var z=0,arrLen=platGs.length; z<arrLen; z++){
				guestsByTimeArr[q].push(platGs[z]);
			}
			for(var z=0,arrLen=goldGs.length; z<arrLen; z++){
				guestsByTimeArr[q].push(goldGs[z]);
			}
			for(var z=0,arrLen=clubGs.length; z<arrLen; z++){
				guestsByTimeArr[q].push(clubGs[z]);
			}
			for(var z=0,arrLen=plainGs.length; z<arrLen; z++){
				guestsByTimeArr[q].push(plainGs[z]);
			}
		}
		var totalWidth=0;
		var totalHTML="";
		var modalHTML="<div class='timelineGuestModals'>";
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
			// THESE THEM GUESTS YO
			for(var i=0,gsts=guestsByTimeArr[x].length; i<gsts; i++){
				if(i%8===0){
					if(i>0){
						insideHTML+="</div>";
						widthCount++;
					}
					insideHTML+="<div class='guestTimelineWrapCol'>";
				}
				// START GUEST
				var guestModalName="guestModal-"+x+"-"+i;
				insideHTML+='<div class="guestTimelineEnclosure ';
				// SHOW GUEST AMBASSADOR
				if(guestsByTimeArr[x][i].pcrStatus.toLowerCase()==="ambassador"){
					insideHTML+='guestTimelineAmbassador ';
				}else if(guestsByTimeArr[x][i].pcrStatus.toLowerCase()==="royal ambassador"){
					insideHTML+='guestTimelineRoyalAmbassador ';
				}else if(guestsByTimeArr[x][i].pcrStatus.toLowerCase()==="gold"){
					insideHTML+='guestTimelineGold ';
				}else if(guestsByTimeArr[x][i].pcrStatus.toLowerCase()==="platinum"){
					insideHTML+='guestTimelinePlatinum ';
				}else if(guestsByTimeArr[x][i].pcrStatus.toLowerCase()==="club"){
					insideHTML+='guestTimelineClub ';
				}else if(guestsByTimeArr[x][i].pcrStatus.toLowerCase()==="not a member"){
					insideHTML+='guestTimelinePlain ';
				}
				insideHTML+='img-rounded" data-toggle="modal" data-target="#'
					+guestModalName+'"><div>';
				//mr, ms or none
				var sexy="<div class='guestTimelineName'>";
				if(guestsByTimeArr[x][i].sex==="m"){
					sexy+="Mr. ";
				}else if(guestsByTimeArr[x][i].sex==="f"){
					sexy+="Ms. ";
				}
				insideHTML+=sexy+guestsByTimeArr[x][i].lname+"</div></div>";
				// show guest special (star)
				if((guestsByTimeArr[x][i].important!==null||
					guestsByTimeArr[x][i].important!=="")&&
					guestsByTimeArr[x][i].important===true){
					insideHTML+='<i class="icon-exclamation-sign '+
						'guestTimelineImportantStarIcon pull-left"> </i>';
				}
				insideHTML+='<div class="guestThumbEnclosure"><center>'+
					'<div class="guestThumbTimeline"><img src="';
				insideHTML+=guestsByTimeArr[x][i].img;
				insideHTML+='"class="img-rounded"/></div></center>'+
					'</div>';
				if(guestsByTimeArr[x][i].pcrStatus.toLowerCase()==="ambassador"){
					insideHTML+='<i class="IClogo"></i>'+
						'<span class="clubLevelText">Ambassador</span>';
				}else if(guestsByTimeArr[x][i].pcrStatus.toLowerCase()==="royal ambassador"){
					insideHTML+='<i class="IClogo"></i>'+
						'<span class="clubLevelText">Royal Ambassador</span>';
				}else if(guestsByTimeArr[x][i].pcrStatus.toLowerCase()==="gold"){
					insideHTML+='<i class="icon-chevron-right icon-white'+
						' pcrChevronIcon"></i>'+
						'<span class="clubLevelText">Gold</span>';
				}else if(guestsByTimeArr[x][i].pcrStatus.toLowerCase()==="platinum"){
					insideHTML+='<i class="icon-chevron-right icon-white'+
						' pcrChevronIcon"></i>'+
						'<span class="clubLevelText">Platinum</span>';
				}else if(guestsByTimeArr[x][i].pcrStatus.toLowerCase()==="club"){
					insideHTML+='<i class="icon-chevron-right icon-white'+
						' pcrChevronIcon"></i>';
				}
				insideHTML+='</div>';
				// MODAL MODAL MODAL
				// MODAL MODAL MODAL
				modalHTML+='<div class="modal hide fade" id="'+guestModalName+'" tabindex="-1"'+ 
					'role="dialog" aria-labelledby="'+guestModalName+'" aria-hidden="true">'+
  					'<div class="modal-header">'+
    				'<button type="button" class="close" data-dismiss="modal"'+
    				'aria-hidden="true">×</button>'+
    				'<h3 id="timeLineModalLabel">'+
    				sexy+
    				guestsByTimeArr[x][i].fname+
    				'&nbsp;'+
    				guestsByTimeArr[x][i].lname+
    				'</h3></div>'+
  					'<div class="modal-body">'+
    				'<p>'+
    				'<div class="guestThumbTimelineModal"><img src="'+
					guestsByTimeArr[x][i].img+
					'"class="img-rounded" /></div>';
					// IMPORTANT
					if(guestsByTimeArr[x][i].important!==undefined&&
						guestsByTimeArr[x][i].important!==null&&
						guestsByTimeArr[x][i].important!==""&&
						guestsByTimeArr[x][i].important===true){
						modalHTML+='<span class="label label-important">Important</span><br>';
					}
					// PCR NUMBER
					/*if(guestsByTimeArr[x][i].pcr!==undefined&&
						guestsByTimeArr[x][i].pcr!==null&&
						guestsByTimeArr[x][i].pcr!==""){
						modalHTML+='PCR#: '+guestsByTimeArr[x][i].pcr+'<br>';
					}*/
					// PCR STATUS
					if(guestsByTimeArr[x][i].pcrStatus!==undefined&&
						guestsByTimeArr[x][i].pcrStatus!==null&&
						guestsByTimeArr[x][i].pcrStatus!==""){
						modalHTML+='PCR Status: <span class="badge';
						switch(guestsByTimeArr[x][i].pcrStatus.toLowerCase()){
							case "not a member":
								modalHTML+=' badge-inverse">'+
									guestsByTimeArr[x][i].pcrStatus;
							break;
							case "club":
								modalHTML+=' badge-info">'+
									guestsByTimeArr[x][i].pcrStatus;
							break;
							case "gold":
								modalHTML+=' badge-gold">'+
									guestsByTimeArr[x][i].pcrStatus;
							break;
							case "platinum":
								modalHTML+='">'+
									guestsByTimeArr[x][i].pcrStatus;
							break;
							case "ambassador":
								modalHTML+=' badge-ambassador">'+
									guestsByTimeArr[x][i].pcrStatus;
							break;
							case "royal ambassador":
								modalHTML+=' badge-royal">'+
									guestsByTimeArr[x][i].pcrStatus;
							break;
						}
						modalHTML+='</span><br>';
					}
					// ARRIVAL TIME
					if(guestsByTimeArr[x][i].arrivaltime!==null||
						guestsByTimeArr[x][i].arrivaltime!==""){
						modalHTML+='Est Arrival Time: '+
							guestsByTimeArr[x][i].arrivaltime+'<br>';
					}
					// Guest Notes
					modalHTML+='Notes: '+guestsByTimeArr[x][i].notes;
    				modalHTML+='</p>'+
  					'</div><div class="modal-footer">'+
    				'<button class="btn" data-dismiss="modal" aria-hidden="true"'+
    				'>Close</button></div></div>';
			}
			totalWidth+=(widthCount*144);
			if(guestsByTimeArr[x].length>=1){
				insideHTML+="</div>"
			}
			if(hr===moment().format('HH')){
				insideHTML+='<div id="timelineHour'+hr+'" class="centerText '+
					'rightBorderTimeRow currentHour" style="width:'+widthCount*144+'px">';
			}else{
				insideHTML+='<div id="timelineHour'+hr+'" class="centerText '+
					'rightBorderTimeRow" style="width:'+widthCount*144+'px">';
			}
			insideHTML+=hr+":00</div></div>";
			beforeHTML+="style='width:"+widthCount*144+"px'>";
			totalHTML+=beforeHTML+insideHTML;
		}
		modalHTML+="</div>";
		$("#scrollyMcScrolls").css("width",totalWidth*144);
		setTimeout(setImgThumbNail,1000);
		return totalHTML+modalHTML;
	});
	$("#scrollyMcScrolls").html(frag);
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
var g_LastTouchEventFiredTime=0;
var g_LastTouchEventFiredVal="";
function touchHandler(event){
	var touches = event.changedTouches;
	try{
		var first = touches[0];
	}catch(e){
		return;
	}
	var type = "";

	if(event.type==="touchstart"){
		g_LastTouchEventFiredTime=new Date().getTime();
		g_LastTouchEventFiredVal=event.type;
		setTimeout(function(){compareTouchEventTimes(event.type,first.target)},250);
	}

	switch(event.type){
		case "touchstart": type = "mousedown"; break;
		case "touchmove":  type="mousemove"; break;
		case "touchend":   type="mouseup"; break;
		case "touchcancel":   type="mouseup"; break;
		default: return;
	}
	var simulatedEvent = document.createEvent("MouseEvent");
	simulatedEvent.initMouseEvent(type, true, true, window, 1,
		first.screenX, first.screenY,
		first.clientX, first.clientY, false,
		false, false, false, 0/*left*/, null);

	first.target.dispatchEvent(simulatedEvent);
	//event.preventDefault();
}
function compareTouchEventTimes(type,tgt){
	var nowTime=new Date().getTime();
	if(nowTime-g_LastTouchEventFiredTime>=249){
		if(g_LastTouchEventFiredVal===type){
			// no touch in last 500ms
			$(tgt).click();
		}
	}
}
function touchInit(){
	document.addEventListener("touchstart", touchHandler, true);
	document.addEventListener("touchmove", touchHandler, true);
	document.addEventListener("touchend", touchHandler, true);
	document.addEventListener("touchcancel", touchHandler, true);
	$("body").hammer({
        transform: false
   }).bind("tap",function(ev) {
        touchHandler(ev);
   });
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
function watchForChange(){
	$('#scrollyMcScrolls').bind('DOMNodeInserted DOMNodeRemoved', function(event) {
    	try{
			$(".modal-backdrop").hide();
			$(".modal").hide();
		}catch(e){
			//nada
		}
	});
}
