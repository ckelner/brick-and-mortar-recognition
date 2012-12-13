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
	$("body").css("overflow","scroll");
}
function getGuests(){
	var day=$("#guestDaySearch").val();
	var daGs=Guests.find({"arrivaldate": day});
	var numOfGuests=daGs.length;
	var gDiv=$("#adminGuestsFound");
	var gHTMLzYo='<table id="guestListTableGrid" class="table table-striped">'+
	'<thead><tr><th>First Name</th><th>Last Name</th><th>PCR#</th><th>PCR Status</th>'+
	'<th>Arrival Date</th><th>Arrival Time</th><th>Sex</th><th>Important</th>'+
	'<th>Photo URL</th><th>Notes</th><th>Delete?</th><tbody>';
	daGs.forEach(function(guest){
		gHTMLzYo+='<tr><td><a href="#" id="'+guest.timestamp+'" data-type="text"'+
			'data-pk="1" data-url="/save/fname" class="adminEditable" '+
			'data-original-title="Enter First Name">'+guest.fname+'</a></td>'+

			'<td><a href="#" id="'+guest.timestamp+'" data-type="text"'+
			'data-pk="1" data-url="/save/lname" class="adminEditable" '+
			'data-original-title="Enter Last Name">'+guest.lname+'</a></td>'+

			'<td><a href="#" id="'+guest.timestamp+'" data-type="text"'+
			'data-pk="1" data-url="/save/pcr" class="adminEditable" '+
			'data-original-title="Enter PCR# (9 digits starting w/ #9)">'+guest.pcr+'</a></td>'+

			'<td><a href="#" id="'+guest.timestamp+'" data-type="text"'+
			'data-pk="1" data-url="/save/pcrStatus" class="adminEditable" '+
			'data-original-title="Enter PCR Status (Club, Gold, Platinum, Ambassador)">'+guest.pcrStatus+'</a></td>'+

			'<td><a href="#" id="'+guest.timestamp+'" data-type="text"'+
			'data-pk="1" data-url="/save/arrivaldate" class="adminEditable" '+
			'data-original-title="Enter Arrival Date (YYYY-MM-DD)">'+guest.arrivaldate+'</a></td>'+

			'<td><a href="#" id="'+guest.timestamp+'" data-type="text"'+
			'data-pk="1" data-url="/save/arrivaltime" class="adminEditable" '+
			'data-original-title="Enter Arrival Time (HH:MM)">'+guest.arrivaltime+'</a></td>'+

			'<td><a href="#" id="'+guest.timestamp+'" data-type="text"'+
			'data-pk="1" data-url="/save/sex" class="adminEditable" '+
			'data-original-title="Enter Sex (male,female,unknown)">'+guest.sex+'</a></td>'+

			'<td><a href="#" id="'+guest.timestamp+'" data-type="text"'+
			'data-pk="1" data-url="/save/img" class="adminEditable" '+
			'data-original-title="Enter Photo URL">'+guest.img+'</a></td>';

			'<td><a href="#" id="'+guest.timestamp+'" data-type="text"'+
			'data-pk="1" data-url="/save/important" class="adminEditable" '+
			'data-original-title="Enter Important (true/false)">'+guest.important+'</a></td>';

		var notesArr=_.toArray(guest.notes);
		var notesLen=notesArr.length;
		gHTMLzYo+='<td><a href="#" id="'+guest.timestamp+'" data-type="text"'+
			'data-pk="1" data-url="/save/notes" class="adminEditable" '+
			'data-original-title="Enter Notes (Comma seperated list w/o spaces)">';
		for(var i=0; i<notesLen; i++){
			gHTMLzYo+=''+
				notesArr[i]+','				
		}
		gHTMLzYo+='<td onClick="killGuest(\''+guest._id+'\')">'+
			'<i class="icon-minus-sign"></i></td></td></tr>';
	});
	gHTMLzYo+='</tbody></table>';
	gDiv.html(gHTMLzYo);
	adminSortTableGuest();
	$('.adminEditable').editable();
}
function adminSortTableGuest(){
	$("#guestListTableGrid").tablecloth({
		condensed: true,
		striped: true,
		sortable: true
	});
}
function killGuest(gId){
	if(gId!==undefined&&gId!==null){
		var r=confirm("Are you sure you want to delete me?");
		if (r==true){
			Guests.remove({"_id": gId});
		}
	}
}
