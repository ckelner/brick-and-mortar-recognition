function clickAddGuest(){
	location.search="admin=br@ndinn0v@ti0n";
}
function clickListGuest(){
	location.search="admin=br@ndinn0v@ti0n&fg=true";
}
function navBarSet(){
	if(getURLParameter("fg")===true||getURLParameter("fg")==="true"){
		$("#adminNavAddGuest").removeClass("active");
		$("#adminNavListGuest").addClass("active");
	}else{
		$("#adminNavListGuest").removeClass("active");
		$("#adminNavAddGuest").addClass("active");
	}
}
function adminLoad(){
	$("#guestDaySearch").val(moment().format('YYYY-MM-DD'));
}
function getGuests(){
	var day=$("#guestDaySearch").val();
	var daGs=Guests.find({"arrivaldate": day});
	var numOfGuests=daGs.length;
	var gDiv=$("#adminGuestsFound");
	var gHTMLzYo='<table id="guestListTableGrid" class="table table-striped">'+
	'<thead><tr><th>First Name</th><th>Last Name</th><th>PCR#</th><th>PCR Status</th>'+
	'<th>Arrival Date</th><th>Arrival Time</th><th>Sex</th><th>Important</th>'+
	'<th>Notes</th><tbody>';
	daGs.forEach(function(guest){
		gHTMLzYo+='<tr><td>'+guest.fname+'</td>'+
			'<td>'+guest.lname+'</td>'+
			'<td>'+guest.pcr+'</td>'+
			'<td>'+guest.pcrStatus+'</td>'+
			'<td>'+guest.arrivaldate+'</td>'+
			'<td>'+guest.arrivaltime+'</td>'+
			'<td>'+guest.sex+'</td>'+
			'<td>'+guest.important+'</td>';
		var notesArr=_.toArray(guest.notes);
		var notesLen=notesArr.length;
		gHTMLzYo+="<td>";
		for(var i=0; i<notesLen; i++){
			gHTMLzYo+=''+
				notesArr[i]+','				
		}
		gHTMLzYo+="</td></tr>";
	});
	gHTMLzYo+='</tbody></table>';
	gDiv.html(gHTMLzYo);
	adminSortTableGuest();
}
function adminSortTableGuest(){
	$("#guestListTableGrid").tablecloth({
		condensed: true,
		striped: true,
		sortable: true
	});
}