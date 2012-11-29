//reset no guest image
function setNoGuestImg(){
	// timeout needed... thanks to default jasny bootstrap
	$("#addGuestPhoto").html("<img src='/guests_photos/no_image.gif' />");
}
function guestPhotoUpload(){
	$('#addGuestModalDiv').modal();
	$("#guestAddPhotoUploadPlsWait").show();
	$("#guestAddPhotoUploadBadMsg").hide();
	$("#guestAddPhotoUploadGoodMsg").hide();
	$("#guestAddPhotoUploadProgressBar").css("width","0%");
	filepicker.store($("#guestPhotoInput")[0], function(FPFile){
            guestDBSave(FPFile.url);
        }, function(FPError){
        	$("#guestAddPhotoUploadPlsWait").hide();
        	$("#guestAddPhotoUploadBadMsg").show();
            $("#guestAddPhotoUploadBadMsg").html("Something went wrong!  Alert a dev: "+FPError);
        }, function(progress){
        	$("#guestAddPhotoUploadProgressBar").css("width",progress+"%");
        }
   );
}
function guestDBSave(photoUrl){
	var firstname=$("#addGuestFname").val();
	var lastname=$("#addGuestLname").val();
	var pcrNum=$("#addGuestPCR").val();
	var aTime=$("#addGuestATime").val();
	var aDate=$("#addGuestADate").val();
	var sexY=getSex();
	var photo=photoUrl;
	var note=$("#addGuestNotes").val().split(', ');
	Guests.insert({
		fname: firstname,
		lname: lastname,
		pcr: pcrNum,
		arrivaltime: aTime,
		arrivaldate: aDate,
		sex: sexY,
		arrive: false,
		notes: note ? [note] : [],
		img: photo,
		timestamp: (new Date()).getTime()
    });
	$("#guestAddPhotoUploadPlsWait").hide();
	$("#guestAddPhotoUploadGoodMsg").show();
	$("#guestAddPhotoUploadGoodMsg").html("Upload & save successful!");
}
function getSex(){
	if($("#guestAddSexMale").is(':checked')){
		return "m";
	}else if($("#guestAddSexFemale").is(':checked')){
		return "f";
	}else{
		return "u";
	}
}
