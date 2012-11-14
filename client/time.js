function setTime(){
	var currentTime=new Date();
	var hours=currentTime.getHours();
	var minutes=currentTime.getMinutes();
	var secs=currentTime.getSeconds();
	global_Secs=secs;
	global_Mins=minutes;
	global_Hours=hours;
	// just make sure that our time is right
	// on the bottom rows... we may have been
	// sitting here awhile
	//setTimelineRowTime();
	if(hours===0&&minutes===0&&seconds<30){
		//reset
		setTimeout(buttonReset,31-seconds);
	}
}

function buildSecs(){
	var sec=global_Secs;
	if(global_Secs<10){
		sec="0"+global_Secs;
	}
	return sec;
}

function buildMins(){
	var min=global_Mins;
	if(global_Mins<10){
		min="0"+global_Mins;
	}
	return min;
}

function buildHrs(){
	var hr=global_Hours;
	if(global_Hours===0){
		hr="00";
	}else{
		if(global_Hours<10){
			hr="0"+global_Hours;
		}
	}
	return hr;
}

function showTime(){
	global_secsClockInput.val(buildSecs).trigger('change');
	global_minsClockInput.val(buildMins).trigger('change');
	global_hrsClockInput.val(buildHrs).trigger('change');
}

function updateTime(){
	if(global_Secs<59){
		global_Secs++; //assuming 1 second intervals
	}else{
		global_Secs=0;
		global_Mins++;
		if(global_Mins>59){
			global_Mins=0;
			global_Hours++;
			if(global_Hours>23){
				global_Hours=0;
			}
		}
	}
}

function setupVisuals(){
	global_secsClockInput.knob({
		'min':0,
		'max':60,
		'readOnly':true,
		'thickness':.2,
		'width':45,
		'fgColor':'#B5A46E'
	});
	global_minsClockInput.knob({
		'min':0,
		'max':60,
		'readOnly':true,
		'thickness':.2,
		'width':45,
		'fgColor':'#B5A46E'
	});
	global_hrsClockInput.knob({
		'min':0,
		'max':60,
		'readOnly':true,
		'thickness':.2,
		'width':45,
		'fgColor':'#B5A46E'
	});
}