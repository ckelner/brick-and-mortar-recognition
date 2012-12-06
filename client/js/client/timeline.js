//144px blocks... use this to advantage...
function setupTimeline(){
	$('#scrollTimeline').draggable({ axis: "x" });
	watchDraggable();
	centerTimelineOnCurrentHr();
}
function watchDraggable(){
	$("#scrollTimeline").bind("dragstop",function(event, ui){});
}
function centerTimelineOnCurrentHr(newHr){
	var hr=(newHr)?newHr:global_Hours;
	//window width minus padding
	var ww=$('#scrollTimeline').parent().width()/2;
	// set up current time
	$('#scrollTimeline').css("left", (-1*((hr)*144)+(ww-144/2)-20));
}
// Chris Kelner - THIS BREAK FUCKING METEOR'S COOL SHIT (DB BINDING)
//for each hour in the day need to build out the guests in the view...
/*
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
*/
//checks after guests are loaded to re-arrange some shizzle
function reArrangeGuestsTimeline(){
	var scrollyDivKids=$("#scrollyMcScrolls").children();
	var totallyWide=0;
	for(var x=0,numOfKiddos=scrollyDivKids.length; x<numOfKiddos; x++){
		//remember one child is the hour div
		var grandKids=_.toArray(scrollyDivKids[x].children);
		var numOfGrandKids=grandKids.length;
		var theHTMLShizzle="";
		//use this to restore later... maybe?
		var hourChild=grandKids.splice(grandKids.length-1,grandKids.length);
		var trimGrandKids=grandKids;
		var howWide=1;
		while(numOfGrandKids>7){
			trimGrandKids=grandKids.splice(0,6);
			theHTMLShizzle+=buildGrandBabyHTML(trimGrandKids);
			numOfGrandKids=grandKids.length;
			howWide++;
		}
		theHTMLShizzle+=buildGrandBabyHTML(grandKids);
		//last
		theHTMLShizzle+=$(hourChild).prop('outerHTML');
		$(scrollyDivKids[x]).html(theHTMLShizzle);
		$(scrollyDivKids[x]).css("width",(howWide*144)+"px");
		$("#timelineHour"+x).css("width",(howWide*144)+"px");
		totallyWide+=(howWide*144)+1;
	}
	$("#scrollyMcScrolls").css("width",totallyWide+"px");
}
function buildGrandBabyHTML(kids){
	var retHTML="<div class='guestTimelineWrapCol'>";
	for(var i=0,kidLen=kids.length; i<kidLen; i++){
		retHTML+=$(kids[i]).prop('outerHTML');
	}
	return retHTML+="</div>";
}
