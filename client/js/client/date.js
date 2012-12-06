function dateHasRolled(){
	//reset
	location.reload();
}
function updateDate(){
	if(global_Date===null||global_Date===undefined){
		global_Date=moment().format('dddd LL');
	}
	if(global_Date!==moment().format('dddd LL')){
		dateHasRolled();
	}else{
		global_TimelineDateDiv.html(moment().format('dddd LL'));
	}
}
