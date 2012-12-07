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
//for each hour in the day need to build out the guests in the view...
function loadGuestInView(){
	var guestsArr=_.toArray(Guests.find({"arrivaldate": 
		moment().format('YYYY-MM-DD')}).collection.docs);
	var guestsByTimeArr=[[],[],[],[],[],[],[],[],[],
		[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
	for(var i=0,guests=guestsArr.length; i<guests; i++){
		var time=guestsArr[0].arrivaltime.substring(0,2);
		if(time.substring(0,1)==="0"){//trim leading 0
			time=time.substring(1,2);
		}
		time=time*1;//make a #
		guestsByTimeArr[time].push(guestsArr[i]);
	}
	var totalWidth=0;
	for(var x=0,guestyArr=guestsByTimeArr.length; x<guestyArr; x++){
		var insideHTML="";
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
			var sexy="";
			if(guestsByTimeArr[x][i].sex==="m"){
				sexy="Mr. ";
			}else if(guestsByTimeArr[x][i].sex==="f"){
				sexy="Ms. ";
			}
			insideHTML+=sexy+guestsByTimeArr[x][i].lname+"</div>";
			insideHTML+='<div class="guestThumbEnclosure"><center>'+
				'<div class="guestThumbTimeline"><img src="';
			insideHTML+=guestsByTimeArr[x][i].img;
			insideHTML+='"class="img-rounded img-PadBottom"/></div></center>'+
				'</div></div>';
		}
		totalWidth+=(widthCount*144);
		var hr=x;
		if(hr<10){
			hr="0"+hr;
		}
		if(guestsByTimeArr[x].length<1){
			insideHTML="&nbsp;";
		}else{
			insideHTML+="</div>"
		}
		if(hr===moment().format('HH')){
			insideHTML+='<div id="timelineHour'+hr+'" class="centerText '+
				'rightBorderTimeRow currentHour">';
		}else{
			insideHTML+='<div id="timelineHour'+hr+'" class="centerText '+
				'rightBorderTimeRow">';
		}
		insideHTML+=hr+":00</div>";
		var guestColHr=$("#timelineGuestHour"+hr);
		guestColHr.html(insideHTML);
		guestColHr.css("width",widthCount*144);
		$("#timelineHour"+hr).css("width",widthCount*144);
	}
	$("#scrollyMcScrolls").css("width",totalWidth*144);
}
