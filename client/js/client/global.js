//GLOBALS
//time (clock)
//----
var global_Secs="0";
var global_Mins="0";
var global_Hours="0";
var global_dateSyncFrequency=60000; //1min
var global_syncFrequency=30000; //30seconds
var global_showFrequency=5000; //5seconds
var global_updateFrequency=1000; //1second
var global_secsClockInput=null;
var global_minsClockInput=null;
var global_hrsClockInput=null;
//----
//timeline hours (bottom of columns)
var global_timelineHr0=null;
var global_timelineHr1=null;
var global_timelineHr2=null;
var global_timelineHr3=null;
var global_timelineHr4=null;
var global_timelineHr5=null;
var global_timelineHr6=null;
var global_timelineHr7=null;
var global_timelineHr8=null;
var global_timelineHr9=null;
var global_timelineHr10=null;
var global_timelineHr11=null;
var global_timelineHr12=null;
var global_timelineHr13=null;
var global_timelineHr14=null;
var global_timelineHr15=null;
var global_timelineHr16=null;
var global_timelineHr17=null;
var global_timelineHr18=null;
var global_timelineHr19=null;
var global_timelineHr20=null;
var global_timelineHr21=null;
var global_timelineHr22=null;
var global_timelineHr23=null;

//-----
//date
var global_TimelineDateDiv=null;
var global_Date=null;

function setUpTimers(){
	setInterval(setTime,global_syncFrequency);
	setInterval(showTime,global_showFrequency);
	setInterval(updateTime,global_updateFrequency);
	setInterval(updateDate,global_dateSyncFrequency);
}

window.addEventListener('load', function() {
    new FastClick(document.body);
}, false);

function getDOMHandlers(){
	//time
	global_secsClockInput=$("#secondsClock");
	global_minsClockInput=$("#minsClock");
	global_hrsClockInput=$("#hrsClock");
	//timeline hours
	global_timelineHr0=$("#timelineHour00");
	global_timelineHr1=$("#timelineHour01");
	global_timelineHr2=$("#timelineHour02");
	global_timelineHr3=$("#timelineHour03");
	global_timelineHr4=$("#timelineHour04");
	global_timelineHr5=$("#timelineHour05");
	global_timelineHr6=$("#timelineHour06");
	global_timelineHr7=$("#timelineHour07");
	global_timelineHr8=$("#timelineHour08");
	global_timelineHr9=$("#timelineHour09");
	global_timelineHr10=$("#timelineHour10");
	global_timelineHr11=$("#timelineHour11");
	global_timelineHr12=$("#timelineHour12");
	global_timelineHr13=$("#timelineHour13");
	global_timelineHr14=$("#timelineHour14");
	global_timelineHr15=$("#timelineHour15");
	global_timelineHr16=$("#timelineHour16");
	global_timelineHr17=$("#timelineHour17");
	global_timelineHr18=$("#timelineHour18");
	global_timelineHr19=$("#timelineHour19");
	global_timelineHr20=$("#timelineHour20");
	global_timelineHr21=$("#timelineHour21");
	global_timelineHr22=$("#timelineHour22");
	global_timelineHr23=$("#timelineHour23");
	//date
	// global_TimelineDateDiv=$("#theTimelineDate");
	// changed to header
	global_TimelineDateDiv=$("#timeline-header");
}

function buttonReset(){
	location.reload();
}

function cssHacks(){
	if(navigator.userAgent.indexOf("Android")!==-1){
   		$('body').append("<link href='/css/droid.css' rel='stylesheet' type='text/css'>");
	}
}

function slowLoad(){
	var frag=Meteor.render(function(){
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
				}
				if(guestsByTimeArr[x][i].pcrStatus.toLowerCase()==="royal ambassador"){
					insideHTML+='guestTimelineRoyalAmbassador ';
				}
				insideHTML+='img-rounded" data-toggle="modal" data-target="#'
					+guestModalName+'"><div>';
				// show guest special (star)
				if((guestsByTimeArr[x][i].important!==null||
					guestsByTimeArr[x][i].important!=="")&&
					guestsByTimeArr[x][i].important===true){
					insideHTML+='<i class="icon-exclamation-sign '+
						'guestTimelineImportantStarIcon pull-left"> </i>';
				}
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
				insideHTML+='"class="img-rounded"/></div></center>'+
					'</div></div>';
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
					if(guestsByTimeArr[x][i].pcr!==undefined&&
						guestsByTimeArr[x][i].pcr!==null&&
						guestsByTimeArr[x][i].pcr!==""){
						modalHTML+='PCR#: '+guestsByTimeArr[x][i].pcr+'<br>';
					}
					// PCR STATUS
					if(guestsByTimeArr[x][i].pcrStatus!==undefined&&
						guestsByTimeArr[x][i].pcrStatus!==null&&
						guestsByTimeArr[x][i].pcrStatus!==""){
						modalHTML+='PCR Status: <span class="badge';
						switch(guestsByTimeArr[x][i].pcrStatus.toLowerCase()){
							case "not-a-member":
								modalHTML+=' badge-inverse">'+
									guestsByTimeArr[x][i].pcrStatus;
							break;
							case "club":
								modalHTML+=' badge-info">'+
									guestsByTimeArr[x][i].pcrStatus;
							break;
							case "gold":
								modalHTML+=' badge-warning">'+
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

Meteor.startup(function(){
	var admin=false;
	if(getURLParameter("admin")==="br@ndinn0v@ti0n"){
		admin=true;
	}
	if(!admin){
		//global
		getDOMHandlers();
		setUpTimers();
		//end-global

		//time
		setTime();
		showTime();
		//end-time
		
		//timeline shizzle
		// chris kelner - had to be slowed down for page to load
		// annoying...
		setTimeout(setupTimeline,2000);
		//re-arrange the timeline to make horizontal scroll work...
	    //setTimeout(someMeteorTimelineMagic,2000);
	    setTimeout(slowLoad,1000);
	    setTimeout(setImgThumbNail,3000);
	    setTimeout(touchInit,2500);
		//end-timeline shizzle

		//date
		updateDate();
		//end-date

		//css...hacks
		cssHacks();
	}else{
		//Seting up Filepicker.io with your api key
	    filepicker.setKey('AcQbwQS8TU6hk8ebqsR2Uz');

	    //admin
	    navBarSet();
	    adminLoad();

	    //mock ajax
	    mockAjaxSetup();
	}
});
/*jQuery(document).ready(function() {
    jQuery('.guestThumbTimeline').nailthumb();
});*/
jQuery.expr.filters.offscreen = function(el) {
  return (((el.offsetLeft + el.offsetWidth) < 200)
         || (el.offsetLeft > window.innerWidth - 200));
};
