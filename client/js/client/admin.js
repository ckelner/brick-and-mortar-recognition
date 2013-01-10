function clickAddGuest(){
	location.search="admin=br@ndinn0v@ti0n";
}
function editGuest(ts){
	location.search="admin=br@ndinn0v@ti0n&edit=true&ts="+ts;
}
function clickListGuest(){
	location.search="admin=br@ndinn0v@ti0n&fg=true";
}
function clickListOptInGuest(){
	location.search="admin=br@ndinn0v@ti0n&opting=true";
}
function navBarSet(){
	if(getURLParameter("fg")===true||getURLParameter("fg")==="true"){
		$("#adminNavAddGuest").removeClass("active");
		$("#adminNavOptInGuest").removeClass("active");
		$("#adminNavListGuest").addClass("active");
	}else{
		if(getURLParameter("edit")===true||getURLParameter("edit")==="true"){
			$("#adminNavAddGuest").removeClass("active");
			$("#adminNavListGuest").removeClass("active");
			$("#adminNavOptInGuest").removeClass("active");
		}else{
			if(getURLParameter("opting")===true||getURLParameter("opting")==="true"){
				$("#adminNavAddGuest").removeClass("active");
				$("#adminNavListGuest").removeClass("active");
				$("#adminNavOptInGuest").addClass("active");
			}else{
				$("#adminNavListGuest").removeClass("active");
				$("#adminNavOptInGuest").removeClass("active");
				$("#adminNavAddGuest").addClass("active");
			}
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
	}else if(getURLParameter("opting")==="true"){
		setupFindOptInGuest();
	}else{
		if(getURLParameter("guestAdd")==="true"){
			document.title="Guest Recognition Opt-in";
			setOnFocusOutFieldsGuestAdd();
		}else{
			setDateTool();
			setTimeTool();
			setOnFocusOutFields();
		}
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
			$("#addGuestTitle").val(guest.title);
			$("#addGPhone").val(guest.phone);
			$("#addGPname").val(guest.pname);
			$("#addGuestLname").val(guest.lname);
			$("#guestPhotoImg")[0].src=guest.img;
			if(guest.type!=="incomplete"){
				$("#addGuestFname").val(guest.fname);
				$("#addGuestPCRStatusSelect").val(guest.pcrStatus);
				$("#addGuestATime").val(moment([1990,1,14,
						parseInt(guest.arrivaltime.substring(0,2)),
						parseInt(guest.arrivaltime.substring(3,5)),
						00,125]).format("hh:mm a"));
				$("#addGuestADate").val(guest.arrivaldate);
				$("#addGuestNotes").val(guest.notes);
				if(guest.important){
					$("#addGuestImportantCheck")[0].checked=true;
				}else{
					$("#addGuestImportantCheck")[0].checked=false;
				}
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
	'<thead><tr><th>Title</th><th>First Name</th><th>Last Name</th>'+
	'<th>Last Name Pronunciation</th><th>Cell Phone #</th><th>PCR Status</th>'+
	'<th>Arrival Date</th><th>Arrival Time</th><th>Photo</th>'+
	'<th>Important</th><th>Notes</th><th>Edit Guest</th><th>Delete Guest</th><tbody>';
	daGs.forEach(function(guest){
		gHTMLzYo+='<tr><td>'+guest.title+'</td>'+

			'<td>'+guest.fname+'</td>'+

			'<td>'+guest.lname+'</td>'+

			'<td>'+guest.pname+'</td>'+

			'<td>'+guest.phone+'</td>'+

			'<td>'+guest.pcrStatus+'</td>'+

			'<td>'+guest.arrivaldate+'</td>'+

			'<td>'+guest.arrivaltime+'</td>'+

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
	$("#addGuestTitle").focusout(function(){
		hideErrorGTit();
		aGTitleDataErrTest();
	});
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
	$("#addPname").focusout(function(){
		hideErrorPName();
		pNameDataErrTest();
	});
	$("#addGPhone").focusout(function(){
		hideErrorGPhone();
		gPhoneDataErrTest();
	});
}
function setOnFocusOutFieldsGuestAdd(){
	$("#addGuestLname").focusout(function(){
		hideErrorLNameGA();
		lastNameDataErrTestGA();
	});
	$("#addGuestPname").focusout(function(){
		hideErrorPNameGA();
		pNameDataErrTestGA();
	});
	$("#addGuestPhone").focusout(function(){
		hideErrorGPhoneGA();
		gPhoneDataErrTestGA();
	});
	$("#addGuestTitle").focusout(function(){
		hideErrorTitleGA();
		titleDataErrTestGA();
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
function setupFindOptInGuest(){
	$("#findGuestForm").hide();
	// slow load
	setTimeout(getOptInGuests,2000);
}
function getOptInGuests(){
	var daGs=Guests.find({"type": "incomplete"});
	var numOfGuests=daGs.length;
	var gDiv=$("#adminGuestsFound");
	var gHTMLzYo='<table id="guestListTableGrid" class="table table-striped">'+
	'<thead><tr><th>Title</th><th>First Name</th><th>Last Name</th>'+
	'<th>Last Name Pronunciation</th><th>Cell Phone #</th><th>PCR Status</th>'+
	'<th>Arrival Date</th><th>Arrival Time</th><th>Photo</th>'+
	'<th>Important</th><th>Notes</th><th>Edit Guest</th><th>Delete Guest</th><tbody>';
	daGs.forEach(function(guest){
		gHTMLzYo+='<tr><td>'+guest.title+'</td>'+

			'<td>'+guest.fname+'</td>'+

			'<td>'+guest.lname+'</td>'+

			'<td>'+guest.pname+'</td>'+

			'<td>'+guest.phone+'</td>'+

			'<td>'+guest.pcrStatus+'</td>'+

			'<td>'+guest.arrivaldate+'</td>'+

			'<td>'+guest.arrivaltime+'</td>'+

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
