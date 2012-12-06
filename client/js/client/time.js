function setTime(){
	var currentTime=new Date();
	var hours=currentTime.getHours();
	var minutes=currentTime.getMinutes();
	var secs=currentTime.getSeconds();
	global_Secs=secs;
	global_Mins=minutes;
	global_Hours=hours;
	if(hours===0&&minutes===0&&secs<2){
		dateHasRolled();
	}
}

function buildMins(){
	var min=global_Mins;
	if(global_Mins<10){
		min="0"+global_Mins;
	}
	return min;
}

function buildHrs(hourOpt){
	var hr=(hourOpt)?hourOpt:global_Hours;
	if(hr===0){
		hr="00";
	}else{
		if(hr<10){
			hr="0"+hr;
		}
	}
	return hr;
}

function showTime(){
	//global_secsClockInput.html(buildSecs);
	global_minsClockInput.html(buildMins);
	global_hrsClockInput.html(buildHrs);
}

function updateTime(){
	if(global_Secs<59){
		global_Secs++; //assuming 1 second intervals
	}else{
		global_Secs=0;
		global_Mins++;
		if(global_Mins>59){
			var oldGlobalHrs=global_Hours;
			global_Mins=0;
			global_Hours++;
			if(global_Hours>23){
				global_Hours=0;
				// the date has rolled
				dateHasRolled();
			}
			// the hour has rolled
			// let us do something about that!
			theHourHasRolled(oldGlobalHrs, global_Hours);
		}
	}
}
function theHourHasRolled(oldHr, newHr){
	swapAndHighlightNewHour(oldHr, newHr);
	centerTimelineOnCurrentHr(newHr);
}
function swapAndHighlightNewHour(oldHr, newHr){
	var oldie=buildHrs(oldHr);
	var newie=buildHrs(newHr);
	$("#timelineGuestHour"+oldie).removeClass("currentHour");
	$("#timelineHour"+oldie).removeClass("currentHour");
	$("#timelineGuestHour"+newie).addClass("currentHour");
	$("#timelineHour"+newie).addClass("currentHour");
}
