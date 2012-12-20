function clickAddGuest(){
	location.search="admin=br@ndinn0v@ti0n";
}
function editGuest(ts){
	location.search="admin=br@ndinn0v@ti0n&edit=true&ts="+ts;
}
function clickListGuest(){
	location.search="admin=br@ndinn0v@ti0n&fg=true";
}
function navBarSet(){
	if(getURLParameter("fg")===true||getURLParameter("fg")==="true"){
		$("#adminNavAddGuest").removeClass("active");
		$("#adminNavListGuest").addClass("active");
	}else{
		if(getURLParameter("edit")===true||getURLParameter("edit")==="true"){
			$("#adminNavAddGuest").removeClass("active");
			$("#adminNavListGuest").removeClass("active");
		}else{
			$("#adminNavListGuest").removeClass("active");
			$("#adminNavAddGuest").addClass("active");
		}
	}
}
function adminLoad(){
	$("body").css("overflow","scroll");
	document.title = "Guest Timeline Admin";
	fixForms();
	if(getURLParameter("fg")==="true"){
		setupFindGuest();
	}else if(getURLParameter("edit")==="true"){
		editGuestLoad();
		setDateTool();
		setTimeTool();
	}else{
		setDateTool();
		setTimeTool();
		setOnFocusOutFields();
	}
}
function editGuestLoad(){
	if(getURLParameter("admin")==="br@ndinn0v@ti0n"){
		if(getURLParameter("edit")==="true"){
			$("#editGuestModalDiv").modal();
			setTimeout(editGuestSlowLoad,4000);
			var guestBtn=$("#guestAddBtn");
			guestBtn.html("Edit Existing Guest");
			guestBtn[0].onclick=function(){};
		}
	}
}
function editGuestSlowLoad(){
	if(getURLParameter("admin")==="br@ndinn0v@ti0n"){
		if(getURLParameter("edit")==="true"){
			// load up the data
			var ts=getURLParameter("ts");
			var guest=Guests.findOne({timestamp:ts});
			$("#addGuestFname").val(guest.fname);
			$("#addGuestLname").val(guest.lname);
			$("#addGuestPCRStatusSelect").val(guest.pcrStatus);
			$("#addGuestATime").val(moment([1990,1,14,
					parseInt(guest.arrivaltime.substring(0,2)),
					parseInt(guest.arrivaltime.substring(3,5)),
					00,125]).format("hh:mm a"));
			$("#addGuestADate").val(guest.arrivaldate);
			$("#guestPhotoImg")[0].src=guest.img;
			$("#addGuestNotes").val(guest.notes);
			switch(guest.sex){
				case "m":
					$("#guestAddSexMale")[0].checked=true;
				break;
				case "f":
					$("#guestAddSexFemale")[0].checked=true;
				break;
				case "u":
					$("#guestAddSexUnknown")[0].checked=true;
				break;
			}
			if(guest.important){
				$("#addGuestImportantCheck")[0].checked=true;
			}else{
				$("#addGuestImportantCheck")[0].checked=false;
			}
			$("#guestAddBtn")[0].onclick=function(){
				editGuestData(guest.img);
			}
			$("#editGuestModalDiv").modal('hide');
		}
	}
}
function fixForms(){
	$('.form').live('keypress', function(e){
	    if(e.keyCode===13&&e.target.type!=="textarea"){
	        getGuests();
	        e.preventDefault();
	    }
	});
}
function getGuests(){
	var day=$("#guestDaySearch").val();
	var daGs=Guests.find({"arrivaldate": day});
	var numOfGuests=daGs.length;
	var gDiv=$("#adminGuestsFound");
	var gHTMLzYo='<table id="guestListTableGrid" class="table table-striped">'+
	'<thead><tr><th>First Name</th><th>Last Name</th><th>PCR Status</th>'+
	'<th>Arrival Date</th><th>Arrival Time</th><th>Sex</th><th>Photo</th>'+
	'<th>Important</th><th>Notes</th><th>Edit Guest</th><th>Delete Guest</th><tbody>';
	daGs.forEach(function(guest){
		/* inline editing removed
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
			'data-original-title="Enter Photo URL">'+guest.img+'</a></td>'+

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
		*/
		gHTMLzYo+='<tr><td>'+guest.fname+'</td>'+

			'<td>'+guest.lname+'</td>'+

			'<td>'+guest.pcrStatus+'</td>'+

			'<td>'+guest.arrivaldate+'</td>'+

			'<td>'+guest.arrivaltime+'</td>'+

			'<td>'+guest.sex+'</td>'+

			'<td><img src="'+guest.img+'"/></td>'+

			'<td>'+guest.important+'</td>'+

			'<td>'+guest.notes+'</td>';
        
		gHTMLzYo+='<td class="edit center" onClick="'+
			'editGuest(\''+guest.timestamp+'\')">'+
			'<button class="btn btn-success"><i class="icon-pencil icon-white">'+
			'</i></button></td>';

		gHTMLzYo+='<td class="delete center" onClick="'+
			'killGuest(\''+guest.timestamp+'\', this)">'+
			'<button class="btn btn-danger"><i class="icon-minus-sign icon-white">'+
			'</i></button></td></tr>';
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
function killGuest(ts, obj){
	if(ts!==undefined&&ts!==null){
		var r=confirm("Are you sure you want to delete this guest?");
		if (r==true){
			Guests.remove({"timestamp": ts});
			$(obj.parentElement).remove();
		}
	}
}
function setTimeTool(){
	$('#addGuestATime').timepicker("destroy");
	$('#addGuestATime').timepicker({
		hourGrid: 4,
		minuteGrid: 10,
		timeFormat: 'hh:mm tt',
		onClose: function(){
			if($("#addGuestATime").val()===""){
				$("#addGuestATime").val("12:00 am");
			}
			hideErrorATime();
			aTimeDataErrTest();
		}
	});
}
function setDateTool(){
	$("#addGuestADate").datepicker("destroy");
	$("#addGuestADate").datepicker({ 
		dateFormat: "yy-mm-dd",
		onClose: function(){
			hideErrorADate();
			aDateDataErrTest();
		}
	});
}
function setOnFocusOutFields(){
	$("#addGuestFname").focusout(function(){
		hideErrorFName();
		firstNameDataErrTest();
	});
	$("#addGuestLname").focusout(function(){
		hideErrorLName();
		lastNameDataErrTest();
	});
	$("#addGuestATime").focusout(function(){
		hideErrorATime();
		aTimeDataErrTest();
	});
	$("#addGuestADate").focusout(function(){
		hideErrorADate();
		aDateDataErrTest();
	});
	$("#addGuestNotes").focusout(function(){
		hideErrorNotes();
		noteDataErrTest();
	});
}
function setupFindGuest(){
	$("#guestDaySearch").val(moment().format('YYYY-MM-DD'));
	$("#guestDaySearch").datepicker({ 
		dateFormat: "yy-mm-dd",
		onClose: function(){
			hideErrorADate();
			aDateDataErrTest();
		}
	});
}
