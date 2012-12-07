//ckelner setImgThumbNail defunct... not sure why we don't need it
// timeline view... guest image rezie
function setImgThumbNail(){
	jQuery.fn.nailthumb.defaults.method = 'resize';
	jQuery('.guestThumbTimeline').nailthumb();
	jQuery('.guestThumbTimelineModal').nailthumb({fitDirection:'top left'});
}
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
	var pcStat=$("#addGuestPCRStatusSelect").val();
	var aTime=$("#addGuestATime").val();
	var aDate=$("#addGuestADate").val();
	var sexY=getGuestSex();
	var imp=getGuestImportant();
	var photo=photoUrl;
	var note=$("#addGuestNotes").val().split(', ');
	Guests.insert({
		fname: firstname,
		lname: lastname,
		pcr: pcrNum,
		pcrStatus: pcStat,
		arrivaltime: aTime,
		arrivaldate: aDate,
		sex: sexY,
		arrive: false,
		important: imp,
		notes: note ? [note] : [],
		img: photo,
		timestamp: (new Date()).getTime()
    });
	$("#guestAddPhotoUploadPlsWait").hide();
	$("#guestAddPhotoUploadGoodMsg").show();
	$("#guestAddPhotoUploadGoodMsg").html("Upload & save successful!");
}
function getGuestSex(){
	if($("#guestAddSexMale").is(':checked')){
		return "m";
	}else if($("#guestAddSexFemale").is(':checked')){
		return "f";
	}else{
		return "u";
	}
}
function getGuestImportant(){
	if($("#addGuestImportantCheck").is(':checked')){
		return true;
	}
}
