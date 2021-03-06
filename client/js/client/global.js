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

Meteor.startup(function(){
	var admin=false;
	var guestAdd=false;
	if(getURLParameter("admin")==="br@ndinn0v@ti0n"){
		admin=true;
	}
	if(getURLParameter("guestAdd")==="true"){
		guestAdd=true;
		document.title="Guest Recognition Opt-In";
	}
	if(!admin&&!guestAdd){
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
